package helpers

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadEnv() {

	err := godotenv.Load("backend.env", "postgres.env")

	if err != nil {
		log.Fatalf("Error loading .env file", err)
	}
}
