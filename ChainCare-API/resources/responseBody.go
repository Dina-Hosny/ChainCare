package resources

type ResNewUser struct {
	UserAccessGrant string `json:"userAccessGrant"`
	UserSalt string `json:"userSalt"`
}

type ResListObjects struct {
	Objects []string `json:"objects"`
}

// response format
type Response struct {
    ID      uint  `json:"id,omitempty"`
    Message string `json:"message,omitempty"`
}


type Unauthorized struct {
	Message string 
}

type TokenCreated struct {
	Message string
}

type SuccessMessage struct {
	Message string
}

type AccessGrant struct {
	Grant string `json:"grant"`
}

