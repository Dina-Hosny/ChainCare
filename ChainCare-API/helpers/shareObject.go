package helpers

import (
	"github.com/johnfelipe/Storj-REST-API/models"
	"github.com/johnfelipe/Storj-REST-API/resources"
	"storj.io/uplink"
)

func Share(req resources.ReqShareObject, user models.DappUser, permission uplink.Permission) (string, error) {

	// Parse The access grant
	userAccess, err := uplink.ParseAccess(req.UserAccessGrant)
	if err != nil {
		return "", err
	}

	objectPrefix := uplink.SharePrefix{Bucket: "app", Prefix: user.EthereumAddress + req.ObjectPrefix}
	grantAccess, err := userAccess.Share(permission, objectPrefix)
	if err != nil {
		return "", err
	}

	serializedAccess, err := grantAccess.Serialize()
	if err != nil {
		return "", err
	}

	return serializedAccess, nil
}

func Shares(req resources.ReqShareObjects, user models.DappUser, permission uplink.Permission) (string, error) {

	// Parse The access grant
	userAccess, err := uplink.ParseAccess(req.UserAccessGrant)
	if err != nil {
		return "", err
	}

	var objectPrefixes []uplink.SharePrefix
	for i := range req.ObjectsPrefix {
		op := uplink.SharePrefix{Bucket: "app", Prefix: user.EthereumAddress + req.ObjectsPrefix[i]}
		objectPrefixes = append(objectPrefixes, op)

	}

	grantAccess, err := userAccess.Share(permission, objectPrefixes...)
	if err != nil {
		return "", err
	}

	serializedAccess, err := grantAccess.Serialize()
	if err != nil {
		return "", err
	}

	return serializedAccess, nil
}
