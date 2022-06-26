package jwtToken

import (
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/johnfelipe/Storj-REST-API/resources"
)

var jwtKey = []byte(os.Getenv("JWTKEY"))

func GenerateAccessToken(ethereumAddress string) (string, time.Time, error) {

	// ? expires in 15/20 minutes
	expirationTime := time.Now().Add(time.Minute * 5)

	claims := &resources.Claims{
		EthereumAddress: ethereumAddress,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenStr, err := accessToken.SignedString(jwtKey)
	if err != nil {
		return "", time.Time{}, err
	}

	return tokenStr, expirationTime, nil
}
