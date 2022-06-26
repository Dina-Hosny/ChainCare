package database

import (
	"fmt"
	"log"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/johnfelipe/Storj-REST-API/models"
)

var Db *gorm.DB

func Setup() {
	// Loading environment variables
	dialect := os.Getenv("DIALECT")
	host := os.Getenv("HOST")

	dbPort := os.Getenv("DBPORT")
	user := os.Getenv("USER")
	dbName := os.Getenv("NAME")
	password := os.Getenv("PASSWORD")

	// Database connection string
	dbURI := fmt.Sprintf("host=%s user=%s dbname=%s  sslmode=disable password=%s port=%s",
		host, user, dbName, password, dbPort)

	// Openning connection to database
	db, err := gorm.Open(dialect, dbURI)
	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Successfully connected to database!")
		Db = db
	}

	// Close connection to database when the main function finishes
	// defer db.Close()

	// Make migrations to the database (made once) if they have not already been created
	db.AutoMigrate(&models.DappUser{})

}

func CloseDatabase() {
	// Close connection to database when the main function finishes
	defer Db.Close()
}
