"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FORM_TITEMS = exports.uiTypeEnums = exports.formLayoutEnums = void 0;
var formLayoutEnums;
exports.formLayoutEnums = formLayoutEnums;

(function (formLayoutEnums) {
  formLayoutEnums["GRID"] = "grid";
  formLayoutEnums["FLOW"] = "flow";
})(formLayoutEnums || (exports.formLayoutEnums = formLayoutEnums = {}));

var uiTypeEnums;
exports.uiTypeEnums = uiTypeEnums;

(function (uiTypeEnums) {
  uiTypeEnums["TEXT"] = "text";
  uiTypeEnums["INFO"] = "info";
  uiTypeEnums["TITLE"] = "title";
  uiTypeEnums["INPUT"] = "input";
  uiTypeEnums["TEXTAREA"] = "textArea";
  uiTypeEnums["NUMBER_INPUT"] = "numberInput";
  uiTypeEnums["CURRENCY_INPUT"] = "currencyInput";
  uiTypeEnums["SWITCH"] = "switch";
  uiTypeEnums["SELECT"] = "select";
  uiTypeEnums["RADIO"] = "radio";
  uiTypeEnums["DATE_PICKER"] = "datePicker";
  uiTypeEnums["DATERANGE_PICKER"] = "dateRangePicker";
  uiTypeEnums["MONTH_PICKER"] = "monthPicker";
  uiTypeEnums["TIME_PICKER"] = "timePicker";
  uiTypeEnums["UPLOAD"] = "upload";
  uiTypeEnums["AVATAR"] = "avatar";
  uiTypeEnums["PICTURES_WALL"] = "picturesWall";
  uiTypeEnums["CUSTOM"] = "custom";
})(uiTypeEnums || (exports.uiTypeEnums = uiTypeEnums = {}));

var FORM_TITEMS = '__formItems__';
exports.FORM_TITEMS = FORM_TITEMS;