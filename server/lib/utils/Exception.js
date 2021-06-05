"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFoundHandler = exports.expressErrorHandler = exports.processEventsHandler = exports.clusterEventsHandler = void 0;

var _Logger = _interopRequireDefault(require("./Logger"));

var _Responder = require("./Responder");

var clusterEventsHandler = function clusterEventsHandler(_cluster) {
  // Catch cluster listening event...
  _cluster.on('listening', function (worker) {
    return _Logger["default"].info("CLUSTER :: Cluster with ProcessID '".concat(worker.process.pid, "' Connected!"));
  }); // Catch cluster once it is back online event...


  _cluster.on('online', function (worker) {
    return _Logger["default"].info("CLUSTER :: Cluster with ProcessID '".concat(worker.process.pid, "' has responded after it was forked! "));
  }); // Catch cluster disconnect event...


  _cluster.on('disconnect', function (worker) {
    return _Logger["default"].info("CLUSTER :: Cluster with ProcessID '".concat(worker.process.pid, "' Disconnected!"));
  }); // Catch cluster exit event...


  _cluster.on('exit', function (worker, code, signal) {
    _Logger["default"].info("CLUSTER :: Cluster with ProcessID '".concat(worker.process.pid, "' is Dead with Code '").concat(code, ", and signal: '").concat(signal, "'")); // Ensuring a new cluster will start if an old one dies


    _cluster.fork();
  });
};

exports.clusterEventsHandler = clusterEventsHandler;

var processEventsHandler = function processEventsHandler() {
  // Catch the Process's uncaught-exception
  process.on('uncaughtException', function (exception) {
    return _Logger["default"].error(exception);
  }); // Catch the Process's warning event

  process.on('warning', function (warning) {
    return _Logger["default"].warn(warning);
  });
}; // eslint-disable-next-line no-unused-vars


exports.processEventsHandler = processEventsHandler;

var expressErrorHandler = function expressErrorHandler(err, req, res, next) {
  _Logger["default"].error(err);

  return (0, _Responder.errorRespond)(res, 'Unexpected error from server', 500);
};

exports.expressErrorHandler = expressErrorHandler;

var notFoundHandler = function notFoundHandler(_express) {
  _express.all('*', function (req, res) {
    // ip from client header or from express request object
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    _Logger["default"].error("Path '".concat(req.originalUrl, "' not found [IP: '").concat(ip, "']!"));

    return (0, _Responder.errorRespond)(res, 'URL not found', 404);
  });

  return _express;
};

exports.notFoundHandler = notFoundHandler;