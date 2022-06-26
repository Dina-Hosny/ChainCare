package helpers

import (
	"context"
	"encoding/json"
	"io/ioutil"

	"github.com/johnfelipe/Storj-REST-API/models"
	"github.com/johnfelipe/Storj-REST-API/resources"
	"storj.io/uplink"
)

func DownloadIdentity(ctx context.Context, req resources.ReqDownloadObject, user models.DappUser) (resources.Identity, error) {

	var data resources.Identity

	// Parse The access grant
	userAccess, err := uplink.ParseAccess(req.UserAccessGrant)
	if err != nil {
		return resources.Identity{}, err
	}

	// Open up the project we will be working with
	project, err := uplink.OpenProject(ctx, userAccess)
	if err != nil {
		return resources.Identity{}, err
	}
	defer project.Close()

	// Intitiate the upload of our Object to the specified bucket and key.
	key := (user.EthereumAddress + req.ObjectKey)
	// Initiate a download of the same object again
	download, err := project.DownloadObject(ctx, "app", key, nil)

	if err != nil {
		return resources.Identity{}, err
	}
	defer download.Close()

	// Read everything from the download stream
	receivedContents, err := ioutil.ReadAll(download)
	if err != nil {
		return resources.Identity{}, err
	}

	json.Unmarshal(receivedContents, &data)

	return data, nil
}

func DownloadRecord(ctx context.Context, req resources.ReqDownloadObject, user models.DappUser) (resources.Record, error) {

	var data resources.Record

	// Parse The access grant
	userAccess, err := uplink.ParseAccess(req.UserAccessGrant)
	if err != nil {
		return resources.Record{}, err
	}

	// Open up the project we will be working with
	project, err := uplink.OpenProject(ctx, userAccess)
	if err != nil {
		return resources.Record{}, err
	}
	defer project.Close()

	// Intitiate the upload of our Object to the specified bucket and key.
	key := (user.EthereumAddress + req.ObjectKey)
	// Initiate a download of the same object again
	download, err := project.DownloadObject(ctx, "app", key, nil)
	if err != nil {
		return resources.Record{}, err
	}
	defer download.Close()

	// Read everything from the download stream
	receivedContents, err := ioutil.ReadAll(download)
	if err != nil {
		return resources.Record{}, err
	}

	json.Unmarshal(receivedContents, &data)

	return data, nil
}
