"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldHaveAppSecret = exports.shouldBeLoggedIn = exports.validateAuth = void 0;

var _Configs = require("../providers/Configs");

var _Encryption = require("../utils/Encryption");

var _Responder = require("../utils/Responder");

var _Logger = _interopRequireDefault(require("../utils/Logger"));

/* eslint-disable camelcase */
var validateAuth = function validateAuth(req) {
  try {
    var authorization = req.headers.authorization;

    if (!authorization) {
      return {
        success: false,
        msg: 'No authorization is found in header'
      };
    }

    if (authorization.split(' ').length > 1) {
      var hash = authorization.split(' ')[1];
      var JWTData = (0, _Encryption.verifyJWT)(hash);

      if (JWTData.success) {
        return {
          success: true
        };
      }
    }

    return {
      success: false,
      msg: 'Invalid authorization is found in header'
    };
  } catch (_error) {
    _Logger["default"].error('validateAuth :: ', _error);

    return {
      success: false,
      msg: 'Unknown error on authorization'
    };
  }
};

exports.validateAuth = validateAuth;

var shouldBeLoggedIn = function shouldBeLoggedIn(req, res, next) {
  var authorizationData = validateAuth(req);

  if (!authorizationData.success) {
    return (0, _Responder.errorRespond)(res, authorizationData.msg, 403);
  }

  return next();
};

exports.shouldBeLoggedIn = shouldBeLoggedIn;

var shouldHaveAppSecret = function shouldHaveAppSecret(req, res, next) {
  try {
    var app_secret = req.headers.app_secret;

    if (!app_secret) {
      return (0, _Responder.errorRespond)(res, 'APP_SECRET not found', 403);
    }

    if (app_secret !== _Configs.APP_SECRET) {
      return (0, _Responder.errorRespond)(res, 'APP_SECRET is not valid', 403);
    }

    return next();
  } catch (_err) {
    _Logger["default"].error('shouldHaveAppSecret :: ', _err);

    return (0, _Responder.errorRespond)(res, 'Error on validating APP_SECRET', 403);
  }
};

exports.shouldHaveAppSecret = shouldHaveAppSecret;