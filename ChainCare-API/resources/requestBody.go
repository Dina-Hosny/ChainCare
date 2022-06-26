package resources

type ReqNewUser struct {
	UserPassphrase string `json:"userPassphrase"`
}

type ReqListObjects struct {
	UserAccessGrant string `json:"userAccessGrant"`
	UserPrefix      string `json:"userPrefix"`
}

type ReqUploadObjectIdentity struct {
	UserAccessGrant string   `json:"userAccessGrant"`
	ObjectKey       string   `json:"objectKey"`
	Data            Identity `json:"identity"`
}

type ReqUploadObjectRecord struct {
	UserAccessGrant string `json:"userAccessGrant"`
	ObjectKey       string `json:"objectKey"`
	Data            Record `json:"record"`
}

type ReqDownloadObject struct {
	UserAccessGrant string `json:"userAccessGrant"`
	ObjectKey       string `json:"objectKey"`
}

type ReqDownloadObjects struct {
	UserAccessGrant string   `json:"userAccessGrant"`
	ObjectKeys      []string `json:"objectKeys"`
}

type ReqDeleteObject struct {
	UserAccessGrant string `json:"userAccessGrant"`
	ObjectKey       string `json:"objectKey"`
}

type ReqDeleteObjects struct {
	UserAccessGrant string   `json:"userAccessGrant"`
	ObjectKeys      []string `json:"objectKeys"`
}

type ReqShareObject struct {
	UserAccessGrant string `json:"userAccessGrant"`
	ObjectPrefix    string `json:"objectPrefix"`
	PermissionType  string `json:"permissionType"`
}

type ReqShareObjects struct {
	UserAccessGrant string   `json:"userAccessGrant"`
	ObjectsPrefix   []string `json:"objectsPrefix"`
	PermissionType  string   `json:"permissionType"`
}

type ReqRevokeAccess struct {
	UserAccessGrant string `json:"userAccessGrant"`
	AccessGrant     string `json:"accessGrant"`
}

type ReqUpdateObject struct {
	UserAccessGrant string `json:"userAccessGrant"`
	ObjectKey       string `json:"objectKey"`
	Data            Record `json:"record"`
}

// type ReqNewProvider struct {
// 	UserAccessGrant         string `json:"userAccessGrant"`
// 	ProviderEthereumAddress string `json:"providerEthereumAddress"`
// }
