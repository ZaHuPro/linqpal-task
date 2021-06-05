"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Logger = _interopRequireDefault(require("../utils/Logger"));

var _Application = _interopRequireDefault(require("../middleware/Application"));

var _Api = _interopRequireDefault(require("../router/Api"));

var _Configs = require("./Configs");

var _Exception = require("../utils/Exception");

var _default = function _default() {
  _Logger["default"].info('SERVER :: Initializes the express server');

  var app = (0, _express["default"])(); // Application level middleware

  app = (0, _Application["default"])(app);

  _Logger["default"].info('Routes :: Mounting API Routes...');

  app.use("/".concat(_Configs.API_PREFIX), _Api["default"]); // Registering Error Handler and Not Found Handler

  app.use(_Exception.expressErrorHandler);
  app = (0, _Exception.notFoundHandler)(app); // Listens for connections on the specified ports

  app.listen(_Configs.PORT, function (_error) {
    if (_error) {
      _Logger["default"].error('SERVER :: Failed to initialize the express server', _error);

      process.exit(1);
    }

    return _Logger["default"].info("SERVER :: Running @ ".concat(_Configs.PORT));
  });
};

exports["default"] = _default;