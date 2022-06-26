package routers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/johnfelipe/Storj-REST-API/middlewares"
	"github.com/johnfelipe/Storj-REST-API/services/iam"
	"github.com/johnfelipe/Storj-REST-API/services/user"
)

func SetupRouters() {
	router := mux.NewRouter()

	router.Schemes("https")

	router.HandleFunc("/api/login/{id}", iam.Login)

	router.Handle("/api/home", middlewares.IsAuthorized(iam.Home))
	router.Handle("/api/refresh", middlewares.IsAuthorized(iam.Refresh))

	router.HandleFunc("/api/users", user.GetUsers).Methods("GET")
	router.HandleFunc("/api/users/{id}", user.GetUser).Methods("GET")
	router.HandleFunc("/api/users", user.CreateUser).Methods("POST")
	router.HandleFunc("/api/users/{id}", user.DeleteUser).Methods("DELETE")

	router.HandleFunc("/api/users/{id}/access", user.GenerateUserAccessGrant).Methods("GET")
	router.HandleFunc("/api/users/{id}/list", user.List).Methods("GET")
	router.HandleFunc("/api/users/{id}/upload/identity", user.UploadIdentity).Methods("POST")
	router.HandleFunc("/api/users/{id}/upload/record", user.UploadRecord).Methods("POST")
	router.HandleFunc("/api/users/{id}/download", user.Download).Methods("GET")
	router.HandleFunc("/api/users/{id}/downloads", user.Downloads).Methods("GET")
	router.HandleFunc("/api/users/{id}/update", user.Update).Methods("PUT")
	router.HandleFunc("/api/users/{id}/delete", user.Delete).Methods("DELETE")
	router.HandleFunc("/api/users/{id}/deletes", user.Deletes).Methods("DELETE")
	router.HandleFunc("/api/users/{id}/share", user.Share).Methods("GET")
	router.HandleFunc("/api/users/{id}/shares", user.Shares).Methods("GET")
	router.HandleFunc("/api/users/{id}/revoke", user.RevokeGrant).Methods("POST")

	fmt.Println("\t* Running on http://localhost:8000/ (Prese CTRL+C to quit) ")
	log.Fatal(http.ListenAndServe(":8000", router))
}
