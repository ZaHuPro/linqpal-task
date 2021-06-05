import crypto from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import { PUBLIC_KEY, PRIVATE_KEY, PASS_PHRASE, AUTH_TOKEN_ALGORITHM, AUTH_TOKEN_EXPIRERS } from '../providers/Configs';

const authOptions = {
  expiresIn: Number(AUTH_TOKEN_EXPIRERS),
  algorithm: AUTH_TOKEN_ALGORITHM,
};

export const rsaEncrypt = (_message) => {
  const buffer = Buffer.from(_message.toString());
  const encrypted = crypto.publicEncrypt(PUBLIC_KEY, buffer);
  return encrypted.toString('base64');
};

export const rsaDecrypt = (_message) => {
  const buffer = Buffer.from(_message, 'base64');
  const decrypted = crypto.privateDecrypt({
    key: PRIVATE_KEY.toString(),
    passphrase: PASS_PHRASE,
  }, buffer);
  return decrypted.toString('utf8');
};

// sign with RSA SHA256
export const createJWT = (_payload) => {
  const privateSecret = {
    key: PRIVATE_KEY,
    passphrase: PASS_PHRASE,
  };

  return sign(_payload, privateSecret, authOptions);
};

export const verifyJWT = (token) => {
  try {
    return {
      success: true,
      data: verify(token, PUBLIC_KEY, authOptions),
    };
  } catch (err) {
    return {
      success: false,
      data: err,
    };
  }
};
