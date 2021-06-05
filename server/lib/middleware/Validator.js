"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ajv = _interopRequireDefault(require("ajv"));

var _Logger = _interopRequireDefault(require("../utils/Logger"));

var _User = _interopRequireDefault(require("../models/User"));

var _Responder = require("../utils/Responder");

function checkIsNotDuplicate(_x, _x2) {
  return _checkIsNotDuplicate.apply(this, arguments);
}

function _checkIsNotDuplicate() {
  _checkIsNotDuplicate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(schema, data) {
    var userCount;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _User["default"].countDocuments((0, _defineProperty2["default"])({}, schema.name, data));

          case 3:
            userCount = _context2.sent;
            return _context2.abrupt("return", !userCount);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

            _Logger["default"].error('checkIsNotDuplicate ::', _context2.t0);

            return _context2.abrupt("return", false);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return _checkIsNotDuplicate.apply(this, arguments);
}

var ajValidator = new _ajv["default"]({
  allErrors: true,
  async: true,
  jsonPointers: true
});
ajValidator.addKeyword('isNotDuplicate', {
  async: true,
  validate: checkIsNotDuplicate
});
ajValidator.addKeyword('validateLength', {
  async: true,
  validate: function validate(length, input) {
    return input.toString().length === length;
  }
});
ajValidator.addSchema({
  $async: true,
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    phoneNumber: {
      type: 'string',
      validateLength: 12,
      isNotDuplicate: {
        name: 'phoneNumber'
      }
    },
    ssn: {
      type: 'string'
    }
  },
  required: ['firstName', 'lastName', 'address', 'phoneNumber', 'ssn'],
  additionalProperties: false,
  errorMessage: {
    validateLength: 'This is my custom error message',
    type: 'This is my custom error message',
    isNotDuplicate: 'This is my custom error message'
  }
}, '/userPOST');

var parseErrors = function parseErrors(validationErrors) {
  try {
    var errors = validationErrors.errors;
    return errors.map(function (error) {
      return {
        name: error.dataPath.slice(1),
        key: error.keyword,
        type: 'manual',
        message: error.keyword !== 'isNotDuplicate' ? error.message : "This ".concat(error.dataPath.slice(1), " already exist in DB")
      };
    });
  } catch (_error) {
    _Logger["default"].error('parseErrors ::', _error);

    return validationErrors;
  }
};

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var validate;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validate = ajValidator.getSchema("".concat(req.path).concat(req.method));
            return _context.abrupt("return", validate(req.body).then(function () {
              return next();
            })["catch"](function (_error) {
              if (!(_error instanceof _ajv["default"].ValidationError)) {
                _Logger["default"].error('Validator ::', _error);

                return (0, _Responder.validationRespond)(res, 'Unexpected error from the server', 500);
              }

              return (0, _Responder.validationRespond)(res, parseErrors(_error), 400);
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;