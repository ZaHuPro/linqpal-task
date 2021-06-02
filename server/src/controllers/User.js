import User from '../models/User';
import Log from '../utils/Logger';
import { successRespond, errorRespond } from '../utils/Responder';

export const listUsersController = async (req, res) => {
  const listData = await User.find();
  try {
    return successRespond(res, 'Successfully users fetched', 202, listData);
  } catch (_err) {
    Log.error('addUserController :: ', _err);
    return errorRespond(res, 'Error while creating the user', 500);
  }
};

export const addUserController = async (req, res) => {
  Log.debug('addUserController :: %o', { body: req.body });
  try {
    const createdData = await User.create(req.body);
    return successRespond(res, 'Successfully user created', 202, createdData);
  } catch (_err) {
    Log.error('addUserController :: ', _err);
    return errorRespond(res, 'Error while creating the user', 500);
  }
};
