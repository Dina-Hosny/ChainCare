package user

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/johnfelipe/Storj-REST-API/database"
	"github.com/johnfelipe/Storj-REST-API/helpers"
	"github.com/johnfelipe/Storj-REST-API/models"
	"github.com/johnfelipe/Storj-REST-API/resources"
	"storj.io/uplink"
)

func Share(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	var req resources.ReqShareObject
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Get User from database
	params := mux.Vars(r)
	var user models.DappUser
	database.Db.First(&user, params["id"])

	var permission uplink.Permission

	switch req.PermissionType {
	case "ReadOnly":
		// permission = uplink.Permission{AllowDownload: true, NotBefore: time.Now().Add( -2 * time.Minute )}
		permission = uplink.ReadOnlyPermission()
		permission.NotBefore = time.Now().Add(-2 * time.Minute)
	case "WriteOnly":
		// permission = uplink.Permission{AllowUpload: true, NotBefore: time.Now().Add( -2 * time.Minute )}
		permission = uplink.WriteOnlyPermission()
		permission.NotBefore = time.Now().Add(-2 * time.Minute)
	case "FullAccess":
		// permission = uplink.Permission{AllowDownload: true, AllowUpload: true, AllowList: true, AllowDelete: true, NotBefore: time.Now().Add( -2 * time.Minute ) }
		permission = uplink.FullPermission()
		permission.NotBefore = time.Now().Add(-2 * time.Minute)
	default:
		http.Error(w, "Request body invalid permission", http.StatusBadRequest)
		return
	}

	accessGrant, err := helpers.Share(req, user, permission)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	grant := resources.AccessGrant{Grant: accessGrant}
	if err := json.NewEncoder(w).Encode(&grant); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func Shares(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	var req resources.ReqShareObjects
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Get User from database
	params := mux.Vars(r)
	var user models.DappUser
	database.Db.First(&user, params["id"])

	var permission uplink.Permission

	switch req.PermissionType {
	case "ReadOnly":
		// permission = uplink.Permission{AllowDownload: true, NotBefore: time.Now().Add( -2 * time.Minute )}
		permission = uplink.ReadOnlyPermission()
		permission.NotBefore = time.Now().Add(-2 * time.Minute)

	case "WriteOnly":
		// permission = uplink.Permission{AllowUpload: true, NotBefore: time.Now().Add( -2 * time.Minute )}
		permission = uplink.WriteOnlyPermission()
		permission.NotBefore = time.Now().Add(-2 * time.Minute)
	case "FullAccess":
		// permission = uplink.Permission{AllowDownload: true, AllowUpload: true, AllowList: true, AllowDelete: true, NotBefore: time.Now().Add( -2 * time.Minute ) }
		permission = uplink.FullPermission()
		permission.NotBefore = time.Now().Add(-2 * time.Minute)
	default:
		http.Error(w, "Request body invalid permission", http.StatusBadRequest)
		return
	}

	accessGrant, err := helpers.Shares(req, user, permission)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	grant := resources.AccessGrant{Grant: accessGrant}
	if err := json.NewEncoder(w).Encode(&grant); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func RevokeGrant(w http.ResponseWriter, r *http.Request) {

	ctx := context.Background()
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	// Get User Request Data
	var req resources.ReqRevokeAccess
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}
	defer r.Body.Close()

	// Get User from database
	params := mux.Vars(r)
	var user models.DappUser
	database.Db.First(&user, params["id"])

	// Parse The access grant
	userAccess, err := uplink.ParseAccess(req.UserAccessGrant)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Open up the project we will be working with
	project, err := uplink.OpenProject(ctx, userAccess)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer project.Close()

	// Get access grant
	access, err := uplink.ParseAccess(req.AccessGrant)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Revoke Access
	err = project.RevokeAccess(ctx, access)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := resources.SuccessMessage{Message: "Successfully revoked acccess grant!"}
	if err := json.NewEncoder(w).Encode(&res); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

}
