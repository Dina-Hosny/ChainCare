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

func UploadIdentity(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	var req resources.ReqUploadObjectIdentity
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Get User from database
	params := mux.Vars(r)
	var user models.DappUser
	database.Db.First(&user, params["id"])

	err := helpers.UploadIdentity(ctx, req, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	resp := struct {
		Message string
	}{
		Message: "Successfully uploaded object",
	}

	if err := json.NewEncoder(w).Encode(&resp); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func UploadRecord(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	var req resources.ReqUploadObjectRecord
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Get User from database
	params := mux.Vars(r)
	var user models.DappUser
	database.Db.First(&user, params["id"])

	err := helpers.UploadRecord(ctx, req, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	resp := struct {
		Message string
	}{
		Message: "Successfully uploaded object",
	}

	if err := json.NewEncoder(w).Encode(&resp); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
