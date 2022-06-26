package jwtToken

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/johnfelipe/Storj-REST-API/resources"
)

func VerifyToken(tokenStr string) (int, *resources.Claims, error) {

	claims := &resources.Claims{}

	tkn, err := jwt.ParseWithClaims(tokenStr, claims,
		func(t *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			return http.StatusUnauthorized, &resources.Claims{}, err
		}
		return http.StatusBadRequest, &resources.Claims{}, err
	}

	if !tkn.Valid {
		return http.StatusUnauthorized, &resources.Claims{}, err
	}

	return -1, claims, nil

}
