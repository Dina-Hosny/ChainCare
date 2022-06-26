package resources

import "github.com/dgrijalva/jwt-go"

type Claims struct {
	EthereumAddress string `json:"ethereumAddress"`
	jwt.StandardClaims
}

