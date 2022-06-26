import CryptoJS from "crypto-js";

// ? Generate a symmetric Key from a password and key size in bits
function generateSymKey(password, keySize) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8); // 16 bytes random salt
  const key = CryptoJS.PBKDF2(password, salt, { keySize: keySize / 32 });
  return key;
}

export { generateSymKey };
