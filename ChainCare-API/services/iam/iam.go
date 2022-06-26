package iam

import (
	"fmt"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/johnfelipe/Storj-REST-API/database"
	"github.com/johnfelipe/Storj-REST-API/jwtToken"
	"github.com/johnfelipe/Storj-REST-API/models"
	"github.com/johnfelipe/Storj-REST-API/resources"
)

// 1. Generate Access Token
// 2. Generate Refresh Token
// 3. Verify Token

func Login(w http.ResponseWriter, r *http.Request) {

	fmt.Println("from Login()")

	// check user address is already registered
	// generate jwt token

	params := mux.Vars(r)

	var user models.DappUser
	database.Db.First(&user, params["id"])

	// Validate the user is already registered
	if user.EthereumAddress == "" {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// ? Generate Access Token
	accessTokenStr, expirationTime, err := jwtToken.GenerateAccessToken(user.EthereumAddress)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	claims := &resources.Claims{
		EthereumAddress: user.EthereumAddress,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	// ? Generate new refresh token
	refreshTokenStr, expirationTime, err := jwtToken.GenerateRefreshToken(claims)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// ? Associate Refresh Token with User
	database.Db.Model(&user).Association("RefreshToken").Append(&models.RefreshToken{RefreshToken: refreshTokenStr})

	http.SetCookie(w, &http.Cookie{
		Name:    "access_token",
		Value:   accessTokenStr,
		Expires: expirationTime,
		Path:    "/",
	})

	http.SetCookie(w,
		&http.Cookie{
			Name:     "refresh_token",
			Value:    refreshTokenStr,
			Expires:  expirationTime,
			Path:     "/",
			HttpOnly: true,
			Secure:   true,
			SameSite: http.SameSiteStrictMode,
		})

}

func Home(w http.ResponseWriter, r *http.Request) {

	fmt.Println("from Home()")

	cookie, err := r.Cookie("access_token")

	if err != nil {
		fmt.Println(err)
		if err == http.ErrNoCookie {
			fmt.Println("error :", err)
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		fmt.Println("error :", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	tokenStr := cookie.Value

	// ? Verify Token
	httpStatusCode, claims, err := jwtToken.VerifyToken(tokenStr)
	if err != nil {
		w.WriteHeader(httpStatusCode)
		return
	}

	w.Write([]byte(fmt.Sprintf("Hello, %s", claims.EthereumAddress)))
}

func Refresh(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	var user models.DappUser
	database.Db.First(&user, params["id"])

	cookie, err := r.Cookie("access_token")
	if err != nil {
		if err == http.ErrNoCookie {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	tokenStr := cookie.Value

	// ? Verify Token
	httpStatusCode, claims, err := jwtToken.VerifyToken(tokenStr)
	if err != nil {
		w.WriteHeader(httpStatusCode)
		return
	}

	// ? verify token from the database storing the refresh_tokens associated with each user.
	var refreshToken models.RefreshToken
	database.Db.Model(&user).Association("RefreshToken").Find(&refreshToken)

	if refreshToken.UserID == user.ID {

		// ? Generate Access Token
		accessTokenStr, expirationTime, err := jwtToken.GenerateAccessToken(user.EthereumAddress)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		// ? Generate Refresh Token
		tokenStr, expirationTime, err := jwtToken.GenerateRefreshToken(claims)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		http.SetCookie(w, &http.Cookie{
			Name:    "access_token",
			Value:   accessTokenStr,
			Expires: expirationTime,
			Path:    "/",
		})

		http.SetCookie(w,
			&http.Cookie{
				Name:     "refresh_token",
				Value:    tokenStr,
				Expires:  expirationTime,
				Path:     "/",
				HttpOnly: true,
				Secure:   true,
				SameSite: http.SameSiteStrictMode,
			})
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
}
