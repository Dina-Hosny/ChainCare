package user

import (
	"crypto/rand"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/johnfelipe/Storj-REST-API/database"
	"github.com/johnfelipe/Storj-REST-API/models"
	"github.com/johnfelipe/Storj-REST-API/resources"
	"storj.io/uplink"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {

	fmt.Println("from CreateUser()")

	// set the header to content type x-www-form-urlencoded
	// allow all origin to handle cors issue
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	// create an empty user of type models.DappUser
	var user models.DappUser

	// decode the json request to user
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Println(user)

	// Check user in database
	// insert user in the database
	createdUser := database.Db.Create(&user)
	err = createdUser.Error
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// format a response object
	res := resources.Response{
		ID:      user.ID,
		Message: "User created successfully",
	}

	// send the response
	json.NewEncoder(w).Encode(res)

}

func DeleteUser(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	var users models.DappUser
	database.Db.First(&users, params["id"])
	database.Db.Delete(&users, users.ID)
	json.NewEncoder(w).Encode(&users)
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []models.DappUser
	database.Db.Find(&users)
	json.NewEncoder(w).Encode(&users)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	var user models.DappUser
	database.Db.First(&user, params["id"])
	json.NewEncoder(w).Encode(user)
}

func GenerateUserAccessGrant(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	// Get User Request Data
	var newUser resources.ReqNewUser
	if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}
	defer r.Body.Close()

	// Get User from database
	params := mux.Vars(r)
	var user models.DappUser
	database.Db.First(&user, params["id"])

	// Create a user access grant for accessing their files
	now := time.Now()
	permission := uplink.ReadOnlyPermission() // WAS full access

	// 2 minutes leeway to avoid time sync issues with the statellite
	permission.NotBefore = now.Add(-2 * time.Minute)
	userPrefix := uplink.SharePrefix{Bucket: "app", Prefix: user.EthereumAddress + "/"}

	// Get App Access Grant
	appAccessStr := os.Getenv("APPACCESS")
	appAccess, err := uplink.ParseAccess(appAccessStr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	userAccess, err := appAccess.Share(permission, userPrefix)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	// serialize the user access grant
	serializedAccess, err := userAccess.Serialize()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	// Generate User Salt
	userSalt := make([]byte, 16)
	rand.Read(userSalt)

	saltedUserKey, err := uplink.DeriveEncryptionKey(newUser.UserPassphrase, userSalt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	err = userAccess.OverrideEncryptionKey("app", user.EthereumAddress+"/", saltedUserKey)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	resUser := resources.ResNewUser{UserAccessGrant: serializedAccess, UserSalt: string(userSalt)}
	if err := json.NewEncoder(w).Encode(&resUser); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

}
