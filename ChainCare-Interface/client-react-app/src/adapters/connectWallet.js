import { ethers } from "ethers";

import detectEthereumProvider from "@metamask/detect-provider";

function checkForWallet() {
  try {
    // const provider = await detectEthereumProvider();
    if (typeof window.ethereum !== "undefined") {
      // From now on, this should always be true:
      // provider === window.ethereum
      return true; // initialize your app
    } else {
      console.log("Please install MetaMask!");
      return false;
    }
  } catch (err) {
    return false;
  }
}

function connectMetaMask() {
  return new Promise((resolve, reject) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider
        .send("eth_requestAccounts", [{ eth_accounts: {} }]) // prompt the user for account connections
        .then(() => {
          resolve({
            status: "success",
            message: "connected to metamask",
          });
        })
        .catch(() => {
          reject({
            status: "failure",
            message: "there was a error connecting to the wallet",
          });
        });
    } catch (err) {
      reject({
        status: "failure",
        message: "there was an error connecting to provider",
      });
    }
  });
}

export { connectMetaMask, checkForWallet };
