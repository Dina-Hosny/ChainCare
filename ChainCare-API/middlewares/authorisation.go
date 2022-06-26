package middlewares

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/dgrijalva/jwt-go"
	"github.com/johnfelipe/Storj-REST-API/jwtToken"
)

var jwtKey = []byte(os.Getenv("JWTKEY"))

// Middleware function
func IsAuthorized(endpoint func(http.ResponseWriter, *http.Request)) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header["Token"] != nil {

			token, err := jwt.Parse(r.Header["Token"][0], func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("there was an error")
				}
				return jwtKey, nil
			})

			if err != nil {
				json.NewEncoder(w).Encode(err.Error())
			}

			if token.Valid {
				endpoint(w, r)
			}

		} else {
			fmt.Fprintf(w, "Not Authorized")
		}
	})
}

func IsAuthorized2(endpoint func(http.ResponseWriter, *http.Request)) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Verify Token
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
		httpStatusCode, _, err := jwtToken.VerifyToken(tokenStr)
		if err != nil {
			w.WriteHeader(httpStatusCode)
			return
		}

		endpoint(w, r)

	})
}
