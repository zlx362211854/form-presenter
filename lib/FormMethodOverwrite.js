"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormMethodOverwrite = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _enums = require("./enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormMethodOverwrite = function FormMethodOverwrite() {
  _classCallCheck(this, FormMethodOverwrite);

  this.__validateFieldsAndScroll = function (form) {
    var _validateFieldsAndScroll = form.validateFieldsAndScroll;

    form.validateFieldsAndScroll = function (cb) {
      _validateFieldsAndScroll(function (err, values) {
        var returnValues = _lodash["default"].cloneDeep(values);

        delete returnValues[_enums.FORM_TITEMS];
        cb(err, returnValues);
      });
    };
  };

  this.__validateFields = function (form) {
    var _validateFields = form.validateFields;

    form.validateFields = function (cb) {
      _validateFields(function (err, values) {
        var returnValues = _lodash["default"].cloneDeep(values);

        delete returnValues[_enums.FORM_TITEMS];
        cb(err, returnValues);
      });
    };
  };
};

exports.FormMethodOverwrite = FormMethodOverwrite;