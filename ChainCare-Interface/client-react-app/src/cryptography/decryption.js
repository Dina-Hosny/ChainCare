import EthCrypto from "eth-crypto";
import CryptoJS from "crypto-js";

import { JsonFormatter } from "./jsonFormatter";

// ? Decrypt Symmetric Key with Private Key
async function decryptSymKeyWithPrivateKey(privateKey, encryptedData) {
  const decryptedSymmKey = await EthCrypto.decryptWithPrivateKey(
    privateKey,
    encryptedData
  );
  return decryptedSymmKey;
}

// ? Decrypt Ciphertext with Symmetric Key
function decryptDataWithSymKey(cipherText, symmetricKey) {
  // var decrypted = CryptoJS.AES.decrypt(cipherText, symmetricKey, {
  //   format: JsonFormatter,
  // });

  // return decrypted.toString(CryptoJS.enc.Utf8);

  var decrypted = CryptoJS.AES.decrypt(cipherText, symmetricKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export { decryptSymKeyWithPrivateKey, decryptDataWithSymKey };
