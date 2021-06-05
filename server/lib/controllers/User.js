"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserController = exports.listUsersController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _Logger = _interopRequireDefault(require("../utils/Logger"));

var _Responder = require("../utils/Responder");

var listUsersController = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var listData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _User["default"].find();

          case 2:
            listData = _context.sent;
            _context.prev = 3;
            return _context.abrupt("return", (0, _Responder.successRespond)(res, 'Successfully users fetched', 202, listData));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](3);

            _Logger["default"].error('addUserController :: ', _context.t0);

            return _context.abrupt("return", (0, _Responder.errorRespond)(res, 'Error while creating the user', 500));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 7]]);
  }));

  return function listUsersController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.listUsersController = listUsersController;

var addUserController = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var createdData;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _Logger["default"].debug('addUserController :: %o', {
              body: req.body
            });

            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].create(req.body);

          case 4:
            createdData = _context2.sent;
            return _context2.abrupt("return", (0, _Responder.successRespond)(res, 'Successfully user created', 202, createdData));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);

            _Logger["default"].error('addUserController :: ', _context2.t0);

            return _context2.abrupt("return", (0, _Responder.errorRespond)(res, 'Error while creating the user', 500));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function addUserController(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addUserController = addUserController;