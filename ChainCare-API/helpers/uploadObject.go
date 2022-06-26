package helpers

import (
	"bytes"
	"context"
	"encoding/json"
	"io"

	"github.com/johnfelipe/Storj-REST-API/models"
	"github.com/johnfelipe/Storj-REST-API/resources"
	"storj.io/uplink"
)

func UploadIdentity(ctx context.Context, req resources.ReqUploadObjectIdentity, user models.DappUser) error {

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

	// Initiates the upload of our Object to the specified bucket and key.
	key := (user.EthereumAddress + req.ObjectKey)
	upload, err := project.UploadObject(ctx, "app", key, nil)
	if err != nil {
		return err
	}

	d, err := json.Marshal(req.Data)
	if err != nil {
		return err
	}
	buf := bytes.NewBuffer([]byte(string(d)))
	_, err = io.Copy(upload, buf)
	if err != nil {
		_ = upload.Abort()
		return err
	}

	// Commit the uploaded object.
	err = upload.Commit()
	if err != nil {
		return err
	}

	return nil
}

func UploadRecord(ctx context.Context, req resources.ReqUploadObjectRecord, user models.DappUser) error {

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

	// Initiate the upload of our Object to the specified bucket and key.
	key := (user.EthereumAddress + req.ObjectKey)
	upload, err := project.UploadObject(ctx, "app", key, nil)
	if err != nil {
		return err
	}

	d, err := json.Marshal(req.Data)
	if err != nil {
		return err
	}
	buf := bytes.NewBuffer([]byte(string(d)))
	_, err = io.Copy(upload, buf)
	if err != nil {
		_ = upload.Abort()
		return err
	}

	// Commit the uploaded object.
	err = upload.Commit()
	if err != nil {
		return err
	}

	return nil
}
