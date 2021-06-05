"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.httpLogger = void 0;

var _morgan = _interopRequireDefault(require("morgan"));

var _winston = require("winston");

require("winston-daily-rotate-file");

var combine = _winston.format.combine,
    colorize = _winston.format.colorize,
    timestamp = _winston.format.timestamp,
    errors = _winston.format.errors,
    printf = _winston.format.printf,
    splat = _winston.format.splat,
    metadata = _winston.format.metadata;
var colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'cyan'
}; // Tell winston that you want to link the colors

(0, _winston.addColors)(colors); // Custom formate logging

var formatter = function formatter(_ref) {
  var level = _ref.level,
      message = _ref.message,
      time = _ref.timestamp,
      meta = _ref.metadata;
  var customFormat = "".concat(time, " | ").concat(level, " | ").concat(message);

  if (meta) {
    if (meta.stack) {
      customFormat = "".concat(customFormat, " | ").concat(meta.stack);
    } else if (meta instanceof Object && Object.entries(meta).length > 0) {
      customFormat = "".concat(customFormat, " | ").concat(JSON.stringify(meta));
    }
  }

  return customFormat;
};

var Logger = (0, _winston.createLogger)({
  level: 'debug',
  format: combine( // error stack trace in metadata
  errors({
    stack: true
  }), metadata(), // timestamp to logger
  timestamp(), // string interpolation
  splat(), printf(formatter)),
  transports: [new _winston.transports.Console({
    format: colorize({
      all: true
    })
  })]
});

if (process.env.NODE_ENV === 'production') {
  Logger.add(new _winston.transports.DailyRotateFile({
    filename: 'logs/error-logs-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d',
    level: 'error'
  }));
  Logger.add(new _winston.transports.DailyRotateFile({
    filename: 'logs/combined-logs-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '2d'
  }));
} // Build the morgan middleware


var httpLogger = (0, _morgan["default"])(':method :url :status :res[content-length] - :response-time ms', {
  stream: {
    write: function write(message) {
      return Logger.http(message);
    }
  }
});
exports.httpLogger = httpLogger;
var _default = Logger;
exports["default"] = _default;