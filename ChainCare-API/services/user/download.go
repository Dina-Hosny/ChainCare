package user

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	"github.com/johnfelipe/Storj-REST-API/database"
	"github.com/johnfelipe/Storj-REST-API/helpers"
	"github.com/johnfelipe/Storj-REST-API/models"
	"github.com/johnfelipe/Storj-REST-API/resources"
)

func Download(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	var req resources.ReqDownloadObject
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Get User from database
	params := mux.Vars(r)
	var user models.DappUser
	database.Db.First(&user, params["id"])

	// String to json
	result := strings.Contains(req.ObjectKey, "identity")
	if result {
		data, err := helpers.DownloadIdentity(ctx, req, user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		if err := json.NewEncoder(w).Encode(&data); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	} else {
		data, err := helpers.DownloadRecord(ctx, req, user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		if err := json.NewEncoder(w).Encode(&data); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func Downloads(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	var req resources.ReqDownloadObjects
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Get User from database
	params := mux.Vars(r)
	var user models.DappUser
	database.Db.First(&user, params["id"])

	var identites []resources.Identity
	var records []resources.Record

	for i := range req.ObjectKeys {
		// String to json
		result := strings.Contains(req.ObjectKeys[i], "identity")
		if result {
			data, err := helpers.DownloadIdentity(ctx, resources.ReqDownloadObject{UserAccessGrant: req.UserAccessGrant, ObjectKey: req.ObjectKeys[i]}, user)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			identites = append(identites, data)
		} else {
			data, err := helpers.DownloadRecord(ctx, resources.ReqDownloadObject{UserAccessGrant: req.UserAccessGrant, ObjectKey: req.ObjectKeys[i]}, user)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			records = append(records, data)
		}
	}

	if err := json.NewEncoder(w).Encode(&identites); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	if err := json.NewEncoder(w).Encode(&records); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
