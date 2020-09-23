"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormMethodOverwrite = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _enums = require("./enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var FormMethodOverwrite = /*#__PURE__*/function () {
  function FormMethodOverwrite() {
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
  }

  _createClass(FormMethodOverwrite, [{
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return FormMethodOverwrite;
}();

exports.FormMethodOverwrite = FormMethodOverwrite;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(FormMethodOverwrite, "FormMethodOverwrite", "/workspace/formPresenter/src/FormMethodOverwrite.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();