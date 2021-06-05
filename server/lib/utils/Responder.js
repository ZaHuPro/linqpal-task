"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationRespond = exports.errorRespond = exports.successRespond = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var successRespond = function successRespond(res, message, code, data) {
  var payload = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  return res.status(200).json(_objectSpread({
    success: true,
    code: code,
    message: message,
    data: data
  }, payload)).end();
};

exports.successRespond = successRespond;

var errorRespond = function errorRespond(res, message, code) {
  return res.status(200).json({
    success: false,
    code: code,
    message: message
  }).end();
};

exports.errorRespond = errorRespond;

var validationRespond = function validationRespond(res, message, code) {
  return res.status(200).json({
    success: false,
    code: code,
    message: message
  }).end();
};

exports.validationRespond = validationRespond;