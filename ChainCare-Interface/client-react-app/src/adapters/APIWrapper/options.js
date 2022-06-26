export const getUsersOptions = {
    url: "http://localhost:8000/api/users",
    method: "GET",
    header: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8"
    }
  };
  
export const getUserOptions = (id) => {
    return {
        url: `http://localhost:8000/api/users/${id}`,
        method: "GET",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        }
    };
};

export const createUserOptions = (ethereumAddress) => {
    return {
        url: "http://localhost:8000/api/users",
        method: "POST",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: ethereumAddress
    };
};

export const deleteUserOptions = (id) => {
    return {
        url: `http://localhost:8000/api/users/${id}`,
        method: "DELETE",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        }
    };
};

export const generateUserAccessOptions = (userPassPhrase, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/access`,
        method: "GET",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: userPassPhrase
    };
};

export const listObjectsOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/list`,
        method: "GET",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

export const uploadIdentityOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/upload/identity`,
        method: "POST",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

export const uploadRecordOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/upload/record`,
        method: "POST",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

export const downloadObjectOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/download`,
        method: "POST",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

export const downloadObjectsOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/downloads`,
        method: "POST",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

export const updateObjectOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/update`,
        method: "PUT",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

export const deleteObjectOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/delete`,
        method: "DELETE",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

export const deleteObjectSOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/deletes`,
        method: "DELETE",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

export const shareObjectOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/share`,
        method: "GET",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

export const shareObjectsOptions = (reqData, id) => {
return {
    url: `http://localhost:8000/api/users/${id}/shares`,
    method: "GET",
    header: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8"
    },
    data: reqData
};
};

export const revokeAccessGrantOptions = (reqData, id) => {
return {
    url: `http://localhost:8000/api/users/${id}/revoke`,
    method: "POST",
    header: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8"
    },
    data: reqData
};
};
