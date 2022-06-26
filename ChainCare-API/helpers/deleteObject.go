package helpers

import (
	"context"

	"github.com/johnfelipe/Storj-REST-API/models"
	"github.com/johnfelipe/Storj-REST-API/resources"
	"storj.io/uplink"
)

func Delete(ctx context.Context, req resources.ReqDeleteObject, user models.DappUser) error {

	// Parse The access grant
	userAccess, err := uplink.ParseAccess(req.UserAccessGrant)
	if err != nil {
		return err
	}

	// Open up the project we will be working with
	project, err := uplink.OpenProject(ctx, userAccess)
	if err != nil {
		return err
	}
	defer project.Close()

	// Intitiate the upload of our Object to the specified bucket and key.
	key := (user.EthereumAddress + req.ObjectKey)

	_, err = project.DeleteObject(ctx, "app", key)
	if err != nil {
		return err
	}

	return nil
}
