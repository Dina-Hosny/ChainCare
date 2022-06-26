package models

import "github.com/jinzhu/gorm"

// Refresh Token Has One Assoicated User
type RefreshToken struct {
	gorm.Model 
	RefreshToken string `json:"refreshToken"` 
	UserID uint
}

