import EthCrypto from "eth-crypto";

import { generateSymKey } from "./generatekeys";

// ? Generate Public Key, Private Key, Symmetric Key and an Address
function newIdentity(password, keySize) {
  const identity = EthCrypto.createIdentity();
  const symmetricKey = generateSymKey(password, keySize);
  return {
    address: identity.address,
    publicKey: identity.publicKey,
    privateKey: identity.privateKey,
    symmetricKey: symmetricKey.toString(),
  };
}

export { newIdentity };
