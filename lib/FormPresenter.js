"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _FormCreator = _interopRequireDefault(require("./FormCreator"));

var _enums = require("./enums");

var _FormLifecycle2 = require("./FormLifecycle");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var FormPresenter = /*#__PURE__*/function (_FormLifecycle) {
  _inherits(FormPresenter, _FormLifecycle);

  var _super = _createSuper(FormPresenter);

  function FormPresenter(options) {
    var _this;

    _classCallCheck(this, FormPresenter);

    _this = _super.call(this);

    _initialiseProps.call(_assertThisInitialized(_this));

    var formItems = options.formItems,
        initFormValues = options.initFormValues,
        onFormCreated = options.onFormCreated,
        onFormDestroy = options.onFormDestroy,
        onFormMount = options.onFormMount,
        formLayout = options.formLayout,
        rest = _objectWithoutProperties(options, ["formItems", "initFormValues", "onFormCreated", "onFormDestroy", "onFormMount", "formLayout"]);

    _this.formItems = formItems;
    _this.initFormValues = initFormValues;
    _this.rest = rest;

    if (formLayout) {
      _this.formLayout = formLayout;
    }
    /* onFormCreated */


    if (onFormCreated) {
      _this.listener.formCreatedListener.push(onFormCreated);
    }
    /* onFormMount */


    if (onFormMount) {
      _this.listener.formMountListener.push(onFormMount);
    }
    /* onFormDestroy */


    if (onFormDestroy) {
      _this.listener.formDestroyListener.push(onFormDestroy);
    }

    if (initFormValues) {
      _this.initForm(formItems, initFormValues, rest);
    }

    return _this;
  }

  _createClass(FormPresenter, [{
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return FormPresenter;
}(_FormLifecycle2.FormLifecycle);

exports["default"] = FormPresenter;

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.formLayout = {
    type: _enums.formLayoutEnums.FLOW // 默认流式布局

  };

  this.setInitformValues = function (initFormValues) {
    _this2.initFormValues = initFormValues;

    _this2.initForm(_this2.formItems, initFormValues, _this2.rest);
  };

  this.initForm = function (formItems, initFormValues, rest) {
    var onFieldsChange = rest.onFieldsChange,
        onValuesChange = rest.onValuesChange;
    var formCreated = false;
    _this2.HOCFormComponent = _antd.Form.create({
      onFieldsChange: onFieldsChange,
      onValuesChange: onValuesChange
    })(function (_ref) {
      var form = _ref.form,
          props = _objectWithoutProperties(_ref, ["form"]);

      _this2.form = form; // rewrite validateFields method

      _this2.__validateFieldsAndScroll(form);

      _this2.__validateFields(form);

      form.getFieldDecorator(_enums.FORM_TITEMS, {
        initialValue: formItems,
        getValueFromEvent: function getValueFromEvent() {
          return undefined;
        }
      });

      if (!formCreated) {
        formCreated = true; // trigger lifeCycle listener

        _this2.triggerListener('formCreatedListener', form);
      }

      return /*#__PURE__*/_react["default"].createElement(_FormCreator["default"], _extends({
        triggerListener: _this2.triggerListener,
        form: form,
        formLayout: _this2.formLayout,
        initFormValues: initFormValues
      }, rest, props));
    });
  };

  this.getFormComponent = function () {
    if (_this2.HOCFormComponent) {
      return _this2.HOCFormComponent;
    }

    return function () {
      return /*#__PURE__*/_react["default"].createElement("div", null);
    };
  };

  this.getForm = function () {
    return _this2.form;
  };

  this.addFormItem = function (formItem, index) {
    if (_this2.form) {
      if (!formItem) return;
      var key = formItem.key;

      var formItems = _this2.form.getFieldValue(_enums.FORM_TITEMS);

      if (!formItems.find(function (i) {
        return i.key === key;
      })) {
        if (typeof index === 'undefined') {
          formItems.push(formItem);
        } else {
          formItems.splice(index, 0, formItem);
        }

        _this2.form.setFieldsValue(_defineProperty({}, _enums.FORM_TITEMS, formItems));
      } else {
        console.warn("Form field ".concat(key, " has already been created!"));
      }
    } else {
      console.warn('Form field cannot be set before the form created!');
    }
  };

  this.hasField = function (key) {
    var formItems = _this2.form.getFieldValue(_enums.FORM_TITEMS);

    if (!formItems.find(function (i) {
      return i.key === key;
    })) {
      return false;
    }

    return true;
  };
};

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(FormPresenter, "FormPresenter", "/workspace/formPresenter/src/FormPresenter.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();