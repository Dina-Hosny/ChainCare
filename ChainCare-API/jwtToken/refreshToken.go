package jwtToken

import (
	"errors"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/johnfelipe/Storj-REST-API/resources"
)

func GenerateRefreshToken(claims *resources.Claims) (string, time.Time, error) {

	// ? Prevent refreshing the token every time
	if time.Until(time.Unix(claims.ExpiresAt, 0)) > 30*time.Second {
		return "", time.Time{}, errors.New("error: cant refresh token now, try again later")
	}

	// ? Expires in 100 days or 7 days
	// expirationTime := time.Now().Add((time.Hour * 24) * 100)
	expirationTime := time.Now().Add(time.Minute * 10)
	claims.ExpiresAt = expirationTime.Unix()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", time.Time{}, err
	}

	return tokenString, expirationTime, nil

}
