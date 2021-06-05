import CryptoJS from 'crypto-js';

const ENCRYPTION_SECRET = process.env.REACT_APP_ENCRYPTION_SECRET || ''
const ENCRYPTION_IV = process.env.REACT_APP_ENCRYPTION_IV || ''

const key = CryptoJS.enc.Base64.parse(ENCRYPTION_SECRET);
const iv = CryptoJS.enc.Hex.parse(ENCRYPTION_IV);

const cipherOptions = { 
  iv, 
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7 
};

export const cryptoEncrypt = (msg) => { 
  return CryptoJS.DES.encrypt(msg, key, cipherOptions).toString() };

export const cryptoDecrypt = (msg) => {
  const bytes = CryptoJS.DES.decrypt(msg, key, cipherOptions);
  return bytes.toString(CryptoJS.enc.Utf8);
};
