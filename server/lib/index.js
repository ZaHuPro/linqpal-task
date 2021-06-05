"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _os = _interopRequireDefault(require("os"));

var _cluster = _interopRequireDefault(require("cluster"));

var _Express = _interopRequireDefault(require("./providers/Express"));

var _Database = require("./providers/Database");

var _Configs = require("./providers/Configs");

var _Exception = require("./utils/Exception");

if (_Configs.ENABLE_CHILD_PROCESS && _cluster["default"].isMaster) {
  // Catches the process events
  (0, _Exception.processEventsHandler)(); // Find the number of available CPUS

  var CPUS = _os["default"].cpus(); // Fork the process, the number of times we have CPUs available


  CPUS.forEach(function () {
    return _cluster["default"].fork();
  }); // Catches the cluster events

  (0, _Exception.clusterEventsHandler)(_cluster["default"]);
} else {
  // Run the Server on Clusters
  (0, _Express["default"])(); // Run the Database pool

  (0, _Database.loadDatabase)();
}