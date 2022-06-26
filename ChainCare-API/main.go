package main

import (
	"context"
	"log"
	"os"

	"github.com/johnfelipe/Storj-REST-API/database"
	"github.com/johnfelipe/Storj-REST-API/helpers"
	"github.com/johnfelipe/Storj-REST-API/routers"
	"github.com/johnfelipe/Storj-REST-API/services/app"
)

func main() {

	helpers.LoadEnv()

	// Generate restricted app access grant
	err := app.AccessGrant(context.Background(), os.Getenv("SATELLITEADDRESS"),
		os.Getenv("APIKEY"), os.Getenv("APPPASSPHRASE"))

	if err != nil {
		log.Fatal("There was an error generating the app access grant")
	}

	database.Setup()

	routers.SetupRouters()

	database.CloseDatabase()

}
