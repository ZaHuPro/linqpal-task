import { ADMIN_PASSWORD } from '../providers/Configs';
import { createJWT } from '../utils/Encryption';
import { successRespond, errorRespond } from '../utils/Responder';

export default (req, res) => {
  const { password } = req.body;
  if (!password) {
    return errorRespond(res, 'Provide a valid password', 403);
  }
  if (password !== ADMIN_PASSWORD) {
    return errorRespond(res, 'Invalid admin password', 403);
  }
  const token = createJWT({
    fullDate: new Date(),
    time: new Date().getTime(),
    ip:
      req.headers['x-forwarded-for']
      || req.headers['x-real-ip']
      || req.connection.remoteAddress,
  });
  return successRespond(res, 'JWT created', 202, token);
};
