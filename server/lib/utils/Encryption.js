"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyJWT = exports.createJWT = exports.rsaDecrypt = exports.rsaEncrypt = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _jsonwebtoken = require("jsonwebtoken");

var _Configs = require("../providers/Configs");

var authOptions = {
  expiresIn: Number(_Configs.AUTH_TOKEN_EXPIRERS),
  algorithm: _Configs.AUTH_TOKEN_ALGORITHM
};

var rsaEncrypt = function rsaEncrypt(_message) {
  var buffer = Buffer.from(_message.toString());

  var encrypted = _crypto["default"].publicEncrypt(_Configs.PUBLIC_KEY, buffer);

  return encrypted.toString('base64');
};

exports.rsaEncrypt = rsaEncrypt;

var rsaDecrypt = function rsaDecrypt(_message) {
  var buffer = Buffer.from(_message, 'base64');

  var decrypted = _crypto["default"].privateDecrypt({
    key: _Configs.PRIVATE_KEY.toString(),
    passphrase: _Configs.PASS_PHRASE
  }, buffer);

  return decrypted.toString('utf8');
}; // sign with RSA SHA256


exports.rsaDecrypt = rsaDecrypt;

var createJWT = function createJWT(_payload) {
  var privateSecret = {
    key: _Configs.PRIVATE_KEY,
    passphrase: _Configs.PASS_PHRASE
  };
  return (0, _jsonwebtoken.sign)(_payload, privateSecret, authOptions);
};

exports.createJWT = createJWT;

var verifyJWT = function verifyJWT(token) {
  try {
    return {
      success: true,
      data: (0, _jsonwebtoken.verify)(token, _Configs.PUBLIC_KEY, authOptions)
    };
  } catch (err) {
    return {
      success: false,
      data: err
    };
  }
};

exports.verifyJWT = verifyJWT;