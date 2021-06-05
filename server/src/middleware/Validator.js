import Ajv from 'ajv';
import Log from '../utils/Logger';
import User from '../models/User';
import { validationRespond } from '../utils/Responder';

async function checkIsNotDuplicate(schema, data) {
  try {
    const userCount = await User.countDocuments({ [schema.name]: data });
    return !userCount;
  } catch (_error) {
    Log.error('checkIsNotDuplicate ::', _error);
    return false;
  }
}

const ajValidator = new Ajv({ allErrors: true, async: true, jsonPointers: true });

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
      type: 'string',
      validateLength: 12,
      isNotDuplicate: { name: 'phoneNumber' },
    },
    ssn: {
      type: 'string',
    },
  },
  required: ['firstName', 'lastName', 'address', 'phoneNumber', 'ssn'],
  additionalProperties: false,
  errorMessage: {
    validateLength: 'This is my custom error message',
    type: 'This is my custom error message',
    isNotDuplicate: 'This is my custom error message',
  },
}, '/userPOST');

const parseErrors = (validationErrors) => {
  try {
    const { errors } = validationErrors;
    return errors.map((error) => ({
      name: error.dataPath.slice(1),
      key: error.keyword,
      type: 'manual',
      message: error.keyword !== 'isNotDuplicate' ? error.message : `This ${error.dataPath.slice(1)} already exist in DB`,
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
        return validationRespond(res, 'Unexpected error from the server', 500);
      }
      return validationRespond(res, parseErrors(_error), 400);
    });
};
