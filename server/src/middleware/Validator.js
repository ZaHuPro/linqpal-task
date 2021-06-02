import Ajv from 'ajv';
import Log from '../utils/Logger';
import User from '../models/User';
import { encrypt } from '../utils/Encryption';
import { errorRespond } from '../utils/Responder';

async function checkIsNotDuplicate(schema, data) {
  try {
    data = schema.encrypt ? encrypt(data) : data;
    const userCount = await User.countDocuments({ [schema.name]: data });
    return !userCount;
  } catch (_error) {
    Log.error('checkIsNotDuplicate ::', _error);
    return false;
  }
}

const ajValidator = new Ajv({ allErrors: true, async: true });

ajValidator.addKeyword('isNotDuplicate', {
  async: true,
  validate: checkIsNotDuplicate,
});

ajValidator.addKeyword('validateLength', {
  async: true,
  validate: (length, input) => input.toString().length === length,
});

ajValidator.addSchema({
  $async: true,
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    address: { type: 'string' },
    phoneNumber: {
      type: 'integer',
      validateLength: 9,
      isNotDuplicate: { name: 'phoneNumber', encrypt: false },
    },
    ssn: {
      type: 'integer',
      validateLength: 9,
      isNotDuplicate: { name: 'ssn', encrypt: true },
    },
  },
  required: ['firstName', 'lastName', 'address', 'phoneNumber', 'ssn'],
  additionalProperties: false,
}, '/userPOST');

const parseErrors = (validationErrors) => {
  try {
    const { errors } = validationErrors;
    return errors.map((error) => ({
      param: error.dataPath.slice(1),
      key: error.keyword,
      message: error.message,
    }));
  } catch (_error) {
    Log.error('parseErrors ::', _error);
    return validationErrors;
  }
};

export default async (req, res, next) => {
  const validate = ajValidator.getSchema(`${req.path}${req.method}`);
  return validate(req.body).then(() => next())
    .catch((_error) => {
      if (!(_error instanceof Ajv.ValidationError)) {
        Log.error('Validator ::', _error);
        return errorRespond(res, 'Unexpected error from the server', 500);
      }
      return errorRespond(res, parseErrors(_error), 400);
    });
};
