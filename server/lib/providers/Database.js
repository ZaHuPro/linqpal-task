"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.loadDatabase = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _Logger = _interopRequireDefault(require("../utils/Logger"));

var _Configs = require("./Configs");

var loadDatabase = function loadDatabase() {
  var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }; // bluebird to make the MongoDB module run asynchronously

  _mongoose["default"].Promise = _bluebird["default"];

  _mongoose["default"].set('useCreateIndex', true);

  _Logger["default"].debug("MONGO_DB :: Connecting to mongo server at: ".concat(_Configs.MONGO_DB_URL));

  _mongoose["default"].connect(_Configs.MONGO_DB_URL, options, function (error) {
    // handle the error case
    if (error) {
      _Logger["default"].error('MONGO_DB :: Failed to connect to the Mongo server!!', error);

      process.exit(1);
    } else {
      _Logger["default"].info('MONGO_DB :: Connected to mongo server');
    }
  });
};

exports.loadDatabase = loadDatabase;
var _default = _mongoose["default"];
exports["default"] = _default;