"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _util = require("./util");

var _enums = require("./enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var FormItem = _antd.Form.Item;
var defaultFormItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

var FormCreator = /*#__PURE__*/function (_React$Component) {
  _inherits(FormCreator, _React$Component);

  var _super = _createSuper(FormCreator);

  function FormCreator() {
    var _temp, _this;

    _classCallCheck(this, FormCreator);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _super.call.apply(_super, [this].concat(args)), _this.renderField = function (formItem) {
      var _this$props = _this.props,
          form = _this$props.form,
          initFormValues = _this$props.initFormValues,
          formLayout = _this$props.formLayout;
      var fieldInitValue = initFormValues[formItem.key];
      var uiKey;
      var UIKeyMapArray = Object.keys(_util.UIKeyMap);

      for (var i = 0; i < UIKeyMapArray.length; i++) {
        if (_util.UIKeyMap[UIKeyMapArray[i]].find(function (k) {
          return k === formItem.uiType;
        })) {
          uiKey = UIKeyMapArray[i];
          break;
        }
      }

      if (uiKey) {
        return _util.UIFunctionMap.get(_util.UIKeyMap[uiKey])(form, formItem, fieldInitValue, formLayout);
      } else {
        return '不存在的formField UI类型:' + formItem.uiType;
      }
    }, _this.renderLayout = function (formItems) {
      var formLayout = _this.props.formLayout;

      if (formLayout.type === _enums.formLayoutEnums.FLOW) {
        return formItems.map(function (formItem, index) {
          var itemLayout; // 流式布局可以自定义布局比例

          if (formLayout.labelCol && formLayout.wrapperCol) {
            itemLayout = {
              labelCol: formLayout.labelCol,
              wrapperCol: formLayout.wrapperCol
            };
          } else {
            itemLayout = defaultFormItemLayout;
          }

          if (formItem.divider) {
            return /*#__PURE__*/_react["default"].createElement(_antd.Divider, {
              key: index,
              style: {
                background: '#EBEBEB'
              }
            });
          }

          var extra;

          if (typeof formItem.extra === 'string') {
            extra = formItem.extra;
          } else if (typeof formItem.extra === 'function') {
            var initFormValues = _this.props.initFormValues;
            var fieldInitValue = initFormValues[formItem.key];
            extra = formItem.extra(fieldInitValue);
          }

          if (formItem.uiType === _enums.uiTypeEnums.TITLE) {
            var Label = function Label(props) {
              return /*#__PURE__*/_react["default"].createElement("span", {
                style: {
                  margin: '0',
                  padding: '0 20px',
                  fontSize: '18px',
                  color: '#000'
                }
              }, props.label);
            };

            return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, itemLayout, {
              colon: false,
              label: /*#__PURE__*/_react["default"].createElement(Label, {
                label: formItem.label
              }),
              key: formItem.label
            }), /*#__PURE__*/_react["default"].createElement("span", {
              style: {
                color: '#878787'
              }
            }, formItem.extra));
          }

          return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, itemLayout, {
            label: formItem.label,
            key: formItem.key,
            extra: extra
          }), _this.renderField(formItem));
        });
      }

      return /*#__PURE__*/_react["default"].createElement(_antd.Row, {
        gutter: 24
      }, formItems.map(function (formItem) {
        return /*#__PURE__*/_react["default"].createElement(_antd.Col, {
          span: formLayout.col,
          key: formItem.key
        }, /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, defaultFormItemLayout, {
          label: formItem.label,
          key: formItem.key,
          extra: formItem.extra
        }), _this.renderField(formItem)));
      }));
    }, _this.handleSubmit = function (e) {
      var _this$props2 = _this.props,
          form = _this$props2.form,
          onSubmit = _this$props2.onSubmit;
      e.preventDefault();
      form.validateFieldsAndScroll(function (err, values) {
        if (!err) {
          console.log('Form返回的值为：', values);
          onSubmit && onSubmit(values);
        }
      });
    }, _temp));
  }

  _createClass(FormCreator, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.triggerListener) {
        this.props.triggerListener('formMountListener', null);
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      return true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.triggerListener) {
        this.props.triggerListener('formDestroyListener', null);
      }
    }
    /**
     * @description: render表单字段
     * @param {type}
     * @return:
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          form = _this$props3.form,
          _this$props3$loading = _this$props3.loading,
          loading = _this$props3$loading === void 0 ? false : _this$props3$loading,
          disableSubmitButton = _this$props3.disableSubmitButton,
          wrapperClassName = _this$props3.wrapperClassName;
      var formItems = form.getFieldValue(_enums.FORM_TITEMS);
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          overflowX: 'hidden'
        },
        className: wrapperClassName
      }, /*#__PURE__*/_react["default"].createElement(_antd.Spin, {
        spinning: loading
      }, /*#__PURE__*/_react["default"].createElement(_antd.Form, {
        onSubmit: this.handleSubmit
      }, this.renderLayout(formItems), !disableSubmitButton && /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
        wrapperCol: {
          span: 24,
          offset: 12
        }
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        type: "primary",
        htmlType: "submit"
      }, "\u63D0\u4EA4")))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return FormCreator;
}(_react["default"].Component);

exports["default"] = FormCreator;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(FormItem, "FormItem", "/workspace/formPresenter/src/FormCreator.tsx");
  reactHotLoader.register(defaultFormItemLayout, "defaultFormItemLayout", "/workspace/formPresenter/src/FormCreator.tsx");
  reactHotLoader.register(FormCreator, "FormCreator", "/workspace/formPresenter/src/FormCreator.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();