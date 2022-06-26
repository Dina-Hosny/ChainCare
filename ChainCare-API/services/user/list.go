package user

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/johnfelipe/Storj-REST-API/database"
	"github.com/johnfelipe/Storj-REST-API/models"
	"github.com/johnfelipe/Storj-REST-API/resources"
	"storj.io/uplink"
)

func List(w http.ResponseWriter, r *http.Request) {

	// Setup response header
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	ctx := context.Background()

	// Get User Request Data
	var req resources.ReqListObjects
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}
	defer r.Body.Close()

	// Get User from database
	params := mux.Vars(r)
	var user models.DappUser
	database.Db.First(&user, params["id"])

	// Get User Access Grant
	userAccess, err := uplink.ParseAccess(req.UserAccessGrant)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	// Open up the project we will be working with
	project, err := uplink.OpenProject(ctx, userAccess)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	defer project.Close()

	objects := project.ListObjects(ctx, "app",
		&uplink.ListObjectsOptions{Prefix: user.EthereumAddress + req.UserPrefix, Recursive: true})

	var objectList resources.ResListObjects
	for objects.Next() {
		item := objects.Item()
		objectList.Objects = append(objectList.Objects, item.Key)
	}

	if err := objects.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	// Sent Response To User
	if err := json.NewEncoder(w).Encode(&objectList); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
