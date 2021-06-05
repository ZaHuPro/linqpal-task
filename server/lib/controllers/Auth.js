"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Configs = require("../providers/Configs");

var _Encryption = require("../utils/Encryption");

var _Responder = require("../utils/Responder");

var _default = function _default(req, res) {
  var password = req.body.password;

  if (!password) {
    return (0, _Responder.errorRespond)(res, 'Provide a valid password', 403);
  }

  if (password !== _Configs.ADMIN_PASSWORD) {
    return (0, _Responder.errorRespond)(res, 'Invalid admin password', 403);
  }

  var token = (0, _Encryption.createJWT)({
    fullDate: new Date(),
    time: new Date().getTime(),
    ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress
  });
  return (0, _Responder.successRespond)(res, 'JWT created', 202, token);
};

exports["default"] = _default;