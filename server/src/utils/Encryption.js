import crypto from 'crypto';
import { PUBLIC_KEY, PRIVATE_KEY, PASS_PHRASE } from '../providers/Configs';

export const encrypt = (_message) => {
  const buffer = Buffer.from(_message.toString());
  const encrypted = crypto.publicEncrypt(PUBLIC_KEY, buffer);
  return encrypted.toString('base64');
};

export const decrypt = (_message) => {
  const buffer = Buffer.from(_message, 'base64');
  const decrypted = crypto.privateDecrypt({
    key: PRIVATE_KEY.toString(),
    passphrase: PASS_PHRASE,
  }, buffer);
  return decrypted.toString('utf8');
};
