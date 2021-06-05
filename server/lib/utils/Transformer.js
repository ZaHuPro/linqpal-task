"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleGetSSN = exports.handleSetSSN = exports.handleGetPhoneNumber = exports.handleSetPhoneNumber = void 0;

// Removing if +1 exist in start and extracting only digits
var handleSetPhoneNumber = function handleSetPhoneNumber(_input) {
  if (new RegExp(/^\+1/).test(_input)) {
    _input = _input.slice(2);
  }

  return _input.replace(new RegExp(/\D+/g), '');
}; // Transforming the phone number in US formate


exports.handleSetPhoneNumber = handleSetPhoneNumber;

var handleGetPhoneNumber = function handleGetPhoneNumber(_input) {
  return _input.replace(new RegExp(/^(\d{3})(\d{3})(\d{4}).*/), '($1) $2-$3');
};

exports.handleGetPhoneNumber = handleGetPhoneNumber;

var handleSetSSN = function handleSetSSN(_input) {
  return _input;
};

exports.handleSetSSN = handleSetSSN;

var handleGetSSN = function handleGetSSN(_input) {
  return _input;
};

exports.handleGetSSN = handleGetSSN;