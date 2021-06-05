"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.userSchema = void 0;

var _Database = _interopRequireDefault(require("../providers/Database"));

var _Encryption = require("../utils/Encryption");

// Define the User Schema
var userSchema = new _Database["default"].Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  address: {
    type: String
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  ssn: {
    type: String
  }
}, {
  timestamps: true
});
exports.userSchema = userSchema;
userSchema.pre('save', function preSave(next) {
  if (!this.isModified('ssn')) {
    return next();
  }

  this.ssn = (0, _Encryption.rsaEncrypt)(this.ssn);
  return next();
});
userSchema.post('save', function (result) {
  result.ssn = (0, _Encryption.rsaDecrypt)(result.ssn);
  return result;
});
userSchema.post('find', function (result) {
  return result.map(function (each) {
    each.ssn = (0, _Encryption.rsaDecrypt)(each.ssn);
    return each;
  });
});

var _default = _Database["default"].model('User', userSchema);

exports["default"] = _default;