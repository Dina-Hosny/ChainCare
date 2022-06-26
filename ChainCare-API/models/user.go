package models

import "github.com/jinzhu/gorm"

type DappUser struct {
	gorm.Model 
	EthereumAddress string `gorm:"type:varchar(42);" json:"ethereumAddress"`
	RefreshToken RefreshToken
}