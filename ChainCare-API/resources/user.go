package resources

type Record struct {
	PatientName string `json:"patient name"`
	RecordName string `json:"record name"`
	Provider string `json:"provider"`
	Date string `json:"date"`
	PatientAddress string `json:"patient address"`
	DoctorAddress string `json:"doctor address"`
	DoctorNote string `json:"doctor note"`
}

type Identity struct {
	FirstName string `json:"firstname"`
	LastName string `json:"lastname"`
}

