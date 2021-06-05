"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _Validator = _interopRequireDefault(require("../middleware/Validator"));

var _Authentication = require("../middleware/Authentication");

var _User = require("../controllers/User");

var _Auth = _interopRequireDefault(require("../controllers/Auth"));

var router = (0, _express.Router)();
router.use(_Authentication.shouldHaveAppSecret);
router.post('/login', _Auth["default"]);
router.get('/user', _Authentication.shouldBeLoggedIn, _User.listUsersController);
router.post('/user', _Validator["default"], _User.addUserController);
var _default = router;
exports["default"] = _default;