import axios from "axios";

import {
  getUsersOptions,
  getUserOptions,
  createUserOptions,
  deleteUserOptions,
  generateUserAccessOptions,
  listObjectsOptions,
  uploadIdentityOptions,
  uploadRecordOptions,
  downloadObjectOptions,
  downloadObjectsOptions,
  updateObjectOptions,
  deleteObjectOptions,

  deleteObjectSOptions,
  shareObjectOptions,
  shareObjectsOptions,
  revokeAccessGrantOptions
} from "./options";

export default class StorjAPI {
  async getUsers() {
    return await axios(getUsersOptions);
  }

  async getUser(id) {
    const options = getUserOptions(id);
    return await axios(options)
  }

  async createUser(ethereumAddress) {
    const options = createUserOptions(ethereumAddress);
    return await axios(options)
  }

  async deleteUser(id) {
    const options = deleteUserOptions(id);

    return await axios(options);
  }

  async generateUserAccess(userPassPhrase, id) {
    const options = generateUserAccessOptions(userPassPhrase, id);
    return await axios(options);
  }

  async listObjects(reqData, id) {
    const options = listObjectsOptions(reqData, id);
    return await axios(options);
  }

  async uploadIdentity(reqData, id) {
    const options = uploadIdentityOptions(reqData, id);
    return await axios(options);
  }

  async uploadRecord(reqData, id) {
    const options = uploadRecordOptions(reqData, id);
    return await axios(options);
  }

  async downloadObject(reqData, id) {
    const options = downloadObjectOptions(reqData, id);
    return await axios(options);
  }

  async downloadObjects(reqData, id) {
    const options = downloadObjectsOptions(reqData, id);
    return await axios(options);
  }

  async updateObject(reqData, id) {
    const options = updateObjectOptions(reqData, id);
    return await axios(options);
  }

  async deleteObject(reqData, id) {
    const options = deleteObjectOptions(reqData, id);
    return axios(options);
  }

  async deleteObjects(reqData, id) {
    const options = deleteObjectsOptions(reqData, id);
    return axios(options);
  }

  async shareObject(reqData, id) {
    const options = shareObjectOptions(reqData, id);
    return axios(options);
  }

  async shareObjects(reqData, id) {
    const options = shareObjectsOptions(reqData, id);
    return axios(options);
  }

  async revokeAccessGrant(reqData, id) {
    const options = revokeAccessGrantOptions(reqData, id);
    return axios(options);
  }
}
