package app

import (
	"context"
	"fmt"
	"log"
	"os"

	"storj.io/uplink"
)

func AccessGrant(ctx context.Context, satelliteAddress, apiKey, appPassPhrase string) error {
	access, err := uplink.RequestAccessWithPassphrase(ctx, satelliteAddress, apiKey, appPassPhrase)
	if err != nil {
		return err
	}

	project, err := uplink.OpenProject(ctx, access)
	if err != nil {
		fmt.Println("here")
		return err
	}

	// Ensure bucket
	_, err = project.EnsureBucket(ctx, "app")
	if err != nil {
		_, err = project.CreateBucket(ctx, "app")
		if err != nil {
			fmt.Println("here")
			return err
		}
	}

	// Create an access grant for reading bucket "app"
	permission := uplink.ReadOnlyPermission() // Was full permission
	shared := uplink.SharePrefix{Bucket: "app"}
	restrictedAccess, err := access.Share(permission, shared)

	if err != nil {
		return err
	}

	// serialize the restricted access grant
	serializedAccess, err := restrictedAccess.Serialize()
	if err != nil {
		return err
	}

	os.Setenv("APPACCESS", serializedAccess)
	log.Println("Successfully generated app access grant for the app bucket")
	return nil
}
