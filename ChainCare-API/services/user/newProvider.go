package user

// import (
// 	"context"
// 	"net/http"
// 	"time"

// 	"github.com/gorilla/mux"
// 	"github.com/mohammedfajer/Storj-REST-API/database"
// 	"github.com/mohammedfajer/Storj-REST-API/models"
// 	"github.com/mohammedfajer/Storj-REST-API/resources"
// 	"storj.io/uplink"
// )

// func generateProviderAccess(w http.ResponseWriter, r *http.Request) {
// 	ctx := context.Background()
// 	w.Header().Set("Content-Type", "application/json; charset=utf-8")

// 	// Get User Request Data
// 	var newUser resources.ReqNewProvider
// 	if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 	}
// 	defer r.Body.Close()

// 	// Get User from database
// 	params := mux.Vars(r)
// 	var user models.DappUser
// 	database.Db.First(&user, params["id"])

// 	// Create Provider Access Grant
// 	now := time.Now()
// 	permission := uplink.FullPermission()

// 	// 2 minutes leeway to avoid time sync issues with the statellite
// 	permission.NotBefore = now.Add(-2 * time.Minute)
// 	providerPrefix := uplink.SharePrefix{Bucket: "app", Prefix: user.EthereumAddress + "/EHRs/" + newUser.ProviderEthereumAddress + "/"}

// 	// Get User Access Grant
// 	userAccess, err := uplink.ParseAccess(newUser.UserAccessGrant);
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// serialize the provider access grant
// 	serializedAccess, err  := userAccess.Serialize()
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// }
