package user

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/johnfelipe/Storj-REST-API/database"
	"github.com/johnfelipe/Storj-REST-API/helpers"
	"github.com/johnfelipe/Storj-REST-API/models"
	"github.com/johnfelipe/Storj-REST-API/resources"
)

func Delete(w http.ResponseWriter, r *http.Request) {

	ctx := context.Background()
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	var req resources.ReqDeleteObject
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Get User from database
	params := mux.Vars(r)
	var user models.DappUser
	database.Db.First(&user, params["id"])

	// Delete object
	err := helpers.Delete(ctx, req, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Send Response back to client
	status := resources.SuccessMessage{Message: "Successfully deleted object"}
	if err := json.NewEncoder(w).Encode(&status); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

}

func Deletes(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	var req resources.ReqDeleteObjects
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Get User from database
	params := mux.Vars(r)
	var user models.DappUser
	database.Db.First(&user, params["id"])

	for i := range req.ObjectKeys {
		// Delete object
		err := helpers.Delete(ctx, resources.ReqDeleteObject{UserAccessGrant: req.UserAccessGrant, ObjectKey: req.ObjectKeys[i]}, user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	// Send Response back to client
	status := resources.SuccessMessage{Message: "Successfully deleted objects"}
	if err := json.NewEncoder(w).Encode(&status); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

}
