import {
  CredentialsServiceClient,
  Credentials,
} from "@trinsic/service-clients";

// import dotenv from "dotenv";
// const env = dotenv.config().parsed;

// const client = new CredentialsServiceClient(
//   new Credentials(process.env.REACT_APP_ACCESSTOK),
//   { noRetryPolicy: true }
// );

// async function IssueDoctorID(formData) {
//   console.log(formData);

//   let params = {
//     definitionId: process.env.REACT_APP_CRED_DEF_ID,
//     automaticIssuance: true,
//     credentialValues: formData,
//   };

//   let result = await client.createCredential(params);
//   return result;
// }

// ? Credentials APIs
export const manchesterHospitalClient = new CredentialsServiceClient(
  new Credentials(process.env.REACT_APP_MANCHESTER_HOSPITAL_ACCESSTOK),
  { noRetryPolicy: true }
);
export const londonHospitalClient = new CredentialsServiceClient(
  new Credentials(process.env.REACT_APP_LONDON_HOSPITAL_ACCESSTOK),
  { noRetryPolicy: true }
);
export const boltonResearchInstituteClient = new CredentialsServiceClient(
  new Credentials(process.env.REACT_APP_BOLTON_RESEARCH_INSTITUTE_ACCESSTOK),
  { noRetryPolicy: true }
);

// ? Issue Credentials

// ! Manchester Hospital
export async function manchesterHospitalIssueDoctorID(formData) {
  console.log(formData);

  let params = {
    definitionId:
      process.env.REACT_APP_CRED_DEF_ID_MANCHESTER_HOSPITAL_DOCTOR_ID,
    automaticIssuance: true,
    credentialValues: formData,
  };
  let result = await manchesterHospitalClient.createCredential(params);
  return result;
}
export async function manchesterHospitalIssueAdminID(formData) {
  let params = {
    definitionId:
      process.env.REACT_APP_CRED_DEF_ID_MANCHESTER_HOSPITAL_ADMIN_ID,
    automaticIssuance: true,
    credentialValues: formData,
  };
  let result = await manchesterHospitalClient.createCredential(params);
  return result;
}

// ! London Hospital

export async function londonHospitalIssueDoctorID(formData) {
  let params = {
    definitionId: process.env.REACT_APP_CRED_DEF_ID_LONDON_HOSPITAL_DOCTOR_ID,
    automaticIssuance: true,
    credentialValues: formData,
  };
  let result = await londonHospitalClient.createCredential(params);
  return result;
}
export async function londonHospitalIssueAdminID(formData) {
  let params = {
    definitionId: process.env.REACT_APP_CRED_DEF_ID_LONDON_HOSPITAL_ADMIN_ID,
    automaticIssuance: true,
    credentialValues: formData,
  };
  let result = await londonHospitalClient.createCredential(params);
  return result;
}

// ! Bolton Research Institute
export async function boltonResearchInstituteIssueEntityID(formData) {
  let params = {
    definitionId:
      process.env.REACT_APP_CRED_DEF_ID_BOLTON_RESEARCH_INSTITUTE_ENTITY_ID,
    automaticIssuance: true,
    credentialValues: formData,
  };
  let result = await boltonResearchInstituteClient.createCredential(params);
  return result;
}

// export { IssueDoctorID, client };
