import EthCrypto from "eth-crypto";
import CryptoJS from "crypto-js";

import { JsonFormatter } from "./jsonFormatter";

// ? Encrypt Symmetric Key with Public Key
async function encryptSymKeyWithPublicKey(publicKey, symmetricKey) {
  const encryptedSymmKey = await EthCrypto.encryptWithPublicKey(
    publicKey,
    symmetricKey
  );
  return encryptedSymmKey;
}

// ? Encrypt Data with Symmetric Key
function encryptDataWithSymKey(plainText, symmetricKey) {
  // var encryptedData = CryptoJS.AES.encrypt(plainText, symmetricKey, {
  //   format: JsonFormatter,
  // });
  // return encryptedData;

  var encryptedData = CryptoJS.AES.encrypt(plainText, symmetricKey);
  return encryptedData.toString();
}

export { encryptSymKeyWithPublicKey, encryptDataWithSymKey };
