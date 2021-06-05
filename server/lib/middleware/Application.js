"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express2 = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _compression = _interopRequireDefault(require("compression"));

var _Logger = _interopRequireWildcard(require("../utils/Logger"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(_express) {
  _Logger["default"].info('Middleware :: Booting the application level middleware...'); // Enables the request body parser
  // For parsing application/json


  _express.use(_express2["default"].json()); // For parsing application/x-www-form-urlencoded


  _express.use(_express2["default"].urlencoded({
    extended: true
  })); // Enables Cross-Origin Resource Sharing (CORS) - HTTP-header based mechanism


  _express.use((0, _cors["default"])()); // Enables HTTP request by morgan NPM custom middleware


  _express.use(_Logger.httpLogger); // Enables API data compression (GZip)


  _express.use((0, _compression["default"])());

  return _express;
};

exports["default"] = _default;