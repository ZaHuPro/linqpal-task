"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.AUTH_TOKEN_EXPIRERS = exports.AUTH_TOKEN_ALGORITHM = exports.APP_SECRET = exports.ADMIN_PASSWORD = exports.PASS_PHRASE = exports.PRIVATE_KEY = exports.PUBLIC_KEY = exports.API_PREFIX = exports.IS_PRODUCTION = exports.MONGO_DB_URL = exports.ENABLE_CHILD_PROCESS = exports.PORT = exports.ENV = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _Logger = _interopRequireDefault(require("../utils/Logger"));

var readKey = function readKey(_fileName) {
  var filePath = _path["default"].resolve(__dirname, "../../keys/".concat(_fileName));

  var key = _fs["default"].readFileSync(filePath, 'utf8');

  return key;
}; // Initializes the configs which is extracting data from .env


_Logger["default"].info('ENV :: Registering the env file');

_dotenv["default"].config();

var ENV = process.env.NODE_ENV || 'development';
exports.ENV = ENV;
var PORT = process.env.PORT || 5000;
exports.PORT = PORT;
var ENABLE_CHILD_PROCESS = process.env.ENABLE_CHILD_PROCESS !== 'NO';
exports.ENABLE_CHILD_PROCESS = ENABLE_CHILD_PROCESS;
var MONGO_DB_URL = process.env.MONGO_DB_URL || '';
exports.MONGO_DB_URL = MONGO_DB_URL;
var IS_PRODUCTION = ENV === 'production';
exports.IS_PRODUCTION = IS_PRODUCTION;
var API_PREFIX = process.env.API_PREFIX || 'api';
exports.API_PREFIX = API_PREFIX;
var PUBLIC_KEY = process.env.PUBLIC_KEY || readKey('public.pem');
exports.PUBLIC_KEY = PUBLIC_KEY;
var PRIVATE_KEY = process.env.PRIVATE_KEY || readKey('private.pem');
exports.PRIVATE_KEY = PRIVATE_KEY;
var PASS_PHRASE = process.env.PASS_PHRASE || '';
exports.PASS_PHRASE = PASS_PHRASE;
var ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123456789';
exports.ADMIN_PASSWORD = ADMIN_PASSWORD;
var APP_SECRET = process.env.APP_SECRET || '98uhu5rfs0cve';
exports.APP_SECRET = APP_SECRET;
var AUTH_TOKEN_ALGORITHM = process.env.AUTH_TOKEN_ALGORITHM || 'RS256';
exports.AUTH_TOKEN_ALGORITHM = AUTH_TOKEN_ALGORITHM;
var AUTH_TOKEN_EXPIRERS = process.env.AUTH_TOKEN_EXPIRERS || 300;
exports.AUTH_TOKEN_EXPIRERS = AUTH_TOKEN_EXPIRERS;
var _default = {
  PORT: PORT,
  ENV: ENV,
  ENABLE_CHILD_PROCESS: ENABLE_CHILD_PROCESS,
  MONGO_DB_URL: MONGO_DB_URL,
  IS_PRODUCTION: IS_PRODUCTION,
  API_PREFIX: API_PREFIX,
  PUBLIC_KEY: PUBLIC_KEY,
  PRIVATE_KEY: PRIVATE_KEY,
  PASS_PHRASE: PASS_PHRASE,
  APP_SECRET: APP_SECRET,
  AUTH_TOKEN_ALGORITHM: AUTH_TOKEN_ALGORITHM,
  AUTH_TOKEN_EXPIRERS: AUTH_TOKEN_EXPIRERS
};
exports["default"] = _default;