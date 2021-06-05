/* eslint-disable camelcase */
import { APP_SECRET } from '../providers/Configs';
import { verifyJWT } from '../utils/Encryption';
import { errorRespond } from '../utils/Responder';
import Log from '../utils/Logger';

export const validateAuth = (req) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return {
        success: false,
        msg: 'No authorization is found in header',
      };
    }
    if (authorization.split(' ').length > 1) {
      const hash = authorization.split(' ')[1];
      const JWTData = verifyJWT(hash);
      if (JWTData.success) {
        return {
          success: true,
        };
      }
    }
    return {
      success: false,
      msg: 'Invalid authorization is found in header',
    };
  } catch (_error) {
    Log.error('validateAuth :: ', _error);
    return {
      success: false,
      msg: 'Unknown error on authorization',
    };
  }
};

export const shouldBeLoggedIn = (req, res, next) => {
  const authorizationData = validateAuth(req);
  if (!authorizationData.success) {
    return errorRespond(res, authorizationData.msg, 403);
  }
  return next();
};

export const shouldHaveAppSecret = (req, res, next) => {
  try {
    const { app_secret } = req.headers;
    if (!app_secret) {
      return errorRespond(res, 'APP_SECRET not found', 403);
    }

    if (app_secret !== APP_SECRET) {
      return errorRespond(res, 'APP_SECRET is not valid', 403);
    }
    return next();
  } catch (_err) {
    Log.error('shouldHaveAppSecret :: ', _err);
    return errorRespond(res, 'Error on validating APP_SECRET', 403);
  }
};
