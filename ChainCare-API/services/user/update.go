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

// Fetch the object by id
// Delete it
// Add new updates at the same id
// 2. Delete
// 3. Upload

func Update(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	var req resources.ReqUpdateObject
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
	a := req.UserAccessGrant
	delReq := resources.ReqDeleteObject{UserAccessGrant: a,
		ObjectKey: req.ObjectKey}
	err := helpers.Delete(ctx, delReq, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Upload Object
	uploadReq := resources.ReqUploadObjectRecord{
		UserAccessGrant: a,
		ObjectKey:       req.ObjectKey,
		Data:            req.Data,
	}
	err = helpers.UploadRecord(ctx, uploadReq, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	resp := struct {
		Message string
	}{
		Message: "Successfully updated object",
	}

	if err := json.NewEncoder(w).Encode(&resp); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}
