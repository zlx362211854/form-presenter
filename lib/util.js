"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIFunctionMap = exports.UIKeyMap = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _index = require("./util/index");

var _Avatar = _interopRequireDefault(require("./formComponents/Avatar"));

var _PicturesWall = _interopRequireDefault(require("./formComponents/PicturesWall"));

var _enums = require("./enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RadioGroup = _antd.Radio.Group;
var MonthPicker = _antd.DatePicker.MonthPicker,
    RangePicker = _antd.DatePicker.RangePicker;
var UIKeyMap = {
  text: [_enums.uiTypeEnums.TEXT],
  info: [_enums.uiTypeEnums.INFO],
  input: [_enums.uiTypeEnums.INPUT],
  textArea: [_enums.uiTypeEnums.TEXTAREA],
  numberInput: [_enums.uiTypeEnums.NUMBER_INPUT],
  currencyInput: [_enums.uiTypeEnums.CURRENCY_INPUT],
  "switch": [_enums.uiTypeEnums.SWITCH],
  select: [_enums.uiTypeEnums.SELECT],
  radio: [_enums.uiTypeEnums.RADIO],
  datePicker: [_enums.uiTypeEnums.DATE_PICKER],
  dateRangePicker: [_enums.uiTypeEnums.DATERANGE_PICKER],
  monthPicker: [_enums.uiTypeEnums.MONTH_PICKER],
  timePicker: [_enums.uiTypeEnums.TIME_PICKER],
  upload: [_enums.uiTypeEnums.UPLOAD],
  avatar: [_enums.uiTypeEnums.AVATAR],
  picturesWall: [_enums.uiTypeEnums.PICTURES_WALL],
  custom: [_enums.uiTypeEnums.CUSTOM]
};
exports.UIKeyMap = UIKeyMap;

var isNumber = function isNumber(val) {
  return /(^[\-0-9][0-9]*(.[0-9]+)?)$/.test(val);
};

var UIFunctionMap = new Map([[UIKeyMap.text, function (form, formItem, fieldInitValue, formLayout) {
  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue
  })( /*#__PURE__*/_react["default"].createElement(_antd.Input, {
    disabled: true
  }));
}], [UIKeyMap.info, function (form, formItem, fieldInitValue, formLayout) {
  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue
  })( /*#__PURE__*/_react["default"].createElement("span", {
    style: formItem.style
  }, formItem.prefix, fieldInitValue, formItem.suffix));
}], [UIKeyMap.input, function (form, formItem, fieldInitValue, formLayout) {
  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue
  })( /*#__PURE__*/_react["default"].createElement(_antd.Input, {
    prefix: formItem.prefix,
    suffix: formItem.suffix,
    disabled: formItem.disabled
  }));
}], [UIKeyMap.textArea, function (form, formItem, fieldInitValue, formLayout) {
  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue
  })( /*#__PURE__*/_react["default"].createElement(_antd.Input.TextArea, {
    rows: formItem.rows
  }));
}], [UIKeyMap.numberInput, function (form, formItem, fieldInitValue, formLayout) {
  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue
  })( /*#__PURE__*/_react["default"].createElement(_antd.InputNumber, {
    style: {
      width: formLayout.type === _enums.formLayoutEnums.GRID ? '100%' : 'auto'
    },
    min: formItem.min,
    max: formItem.max,
    formatter: function formatter(value) {
      if (!isNumber(value.toString())) return '';

      if (value) {
        return "".concat(typeof formItem.prefix === 'undefined' ? '' : formItem.prefix).concat(value).concat(typeof formItem.suffix === 'undefined' ? '' : formItem.suffix);
      }
    },
    parser: function parser(value) {
      if (!isNumber(value)) return '';

      if (value) {
        return value.replace(formItem.prefix, '').replace(formItem.suffix, '');
      }
    },
    step: formItem.step,
    disabled: formItem.disabled
  }));
}], [UIKeyMap.currencyInput, function (form, formItem, fieldInitValue, formLayout) {
  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue
  })( /*#__PURE__*/_react["default"].createElement(_antd.InputNumber, {
    style: {
      width: formLayout.type === _enums.formLayoutEnums.GRID ? '100%' : 'auto'
    },
    disabled: formItem.disabled,
    formatter: function formatter(value) {
      if (value) {
        return "".concat(typeof formItem.prefix === 'undefined' ? '' : formItem.prefix).concat((0, _index.formatMoney)(value)).concat(typeof formItem.suffix === 'undefined' ? '' : formItem.suffix);
      }
    },
    parser: function parser(value) {
      if (value) {
        return value.replace(formItem.prefix, '').replace(formItem.suffix, '').replace(/,/g, '');
      }
    }
  }));
}], [UIKeyMap["switch"], function (form, formItem, fieldInitValue, formLayout) {
  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue,
    valuePropName: 'checked'
  })( /*#__PURE__*/_react["default"].createElement(_antd.Switch, {
    disabled: formItem.disabled
  }));
}], [UIKeyMap.select, function (form, formItem, fieldInitValue, formLayout) {
  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue && fieldInitValue.value
  })( /*#__PURE__*/_react["default"].createElement(_antd.Select, {
    placeholder: "",
    disabled: formItem.disabled,
    getPopupContainer: function getPopupContainer(triggerNode) {
      return triggerNode.parentNode;
    }
  }, fieldInitValue && fieldInitValue.options && fieldInitValue.options.map(function (option) {
    return /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
      value: option[formItem.selectOptions.key],
      key: option[formItem.selectOptions.key]
    }, option[formItem.selectOptions.title]);
  })));
}], [UIKeyMap.radio, function (form, formItem, fieldInitValue, formLayout) {
  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue && fieldInitValue.value
  })( /*#__PURE__*/_react["default"].createElement(RadioGroup, {
    disabled: formItem.disabled
  }, fieldInitValue && fieldInitValue.options && fieldInitValue.options.map(function (option) {
    return /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
      value: option[formItem.radioOptions.key],
      key: option[formItem.radioOptions.key]
    }, option[formItem.radioOptions.title]);
  })));
}], [UIKeyMap.datePicker, function (form, formItem, fieldInitValue, formLayout) {
  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue && fieldInitValue.value
  })( /*#__PURE__*/_react["default"].createElement(_antd.DatePicker, {
    showTime: formItem.showTime,
    format: formItem.format,
    style: {
      width: formLayout.type === _enums.formLayoutEnums.GRID ? '100%' : 'auto'
    }
  }));
}], [UIKeyMap.dateRangePicker, function (form, formItem, fieldInitValue, formLayout) {
  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue && fieldInitValue.value
  })( /*#__PURE__*/_react["default"].createElement(RangePicker, {
    showTime: formItem.showTime,
    format: formItem.format,
    style: {
      width: formLayout.type === _enums.formLayoutEnums.GRID ? '100%' : 'auto'
    }
  }));
}], [UIKeyMap.monthPicker, function (form, formItem, fieldInitValue, formLayout) {
  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue && fieldInitValue.value
  })( /*#__PURE__*/_react["default"].createElement(MonthPicker, {
    style: {
      width: formLayout.type === _enums.formLayoutEnums.GRID ? '100%' : 'auto'
    }
  }));
}], [UIKeyMap.timePicker, function (form, formItem, fieldInitValue, formLayout) {
  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue && fieldInitValue.value
  })( /*#__PURE__*/_react["default"].createElement(_antd.TimePicker, {
    format: formItem.format,
    style: {
      width: formLayout.type === _enums.formLayoutEnums.GRID ? '100%' : 'auto'
    }
  }));
}], // [
//   UIKeyMap.upload,
//   (form, formItem, fieldInitValue, formLayout) => {
//     console.log(formItem.uploadProps, 'uploadProps')
//     return form.getFieldDecorator(formItem.key, {
//       rules: formItem.rules,
//       initialValue: fieldInitValue && fieldInitValue.value
//     })(
//       <LwjUpload {...formItem.uploadProps} />
//     )
//   }
// ],
[UIKeyMap.avatar, function (form, formItem, fieldInitValue, formLayout) {
  var onChange = function onChange(value) {
    form.setFieldsValue(_defineProperty({}, formItem.key, value));
  };

  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue
  })( /*#__PURE__*/_react["default"].createElement(_Avatar["default"], _extends({}, formItem.uploadProps, {
    initImageUrl: fieldInitValue,
    onChange: onChange
  })));
}], [UIKeyMap.picturesWall, function (form, formItem, fieldInitValue, formLayout) {
  var onChange = function onChange(value) {
    form.setFieldsValue(_defineProperty({}, formItem.key, value));
  };

  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue
  })( /*#__PURE__*/_react["default"].createElement(_PicturesWall["default"], _extends({}, formItem.uploadProps, {
    initImageUrls: fieldInitValue,
    onChange: onChange
  })));
}], [UIKeyMap.custom, function (form, formItem, fieldInitValue, formLayout) {
  var Custom = formItem.render;
  return form.getFieldDecorator(formItem.key, {
    rules: formItem.rules,
    initialValue: fieldInitValue && fieldInitValue.value
  })( /*#__PURE__*/_react["default"].createElement(Custom, null));
}]]);
exports.UIFunctionMap = UIFunctionMap;