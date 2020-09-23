"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatMoney = formatMoney;

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

function formatMoney(value, params) {
  var _ref = params || {},
      digit = _ref.digit,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? '' : _ref$prefix;

  if (value === null) return '';
  if (typeof value === 'undefined') return '';
  if (typeof value !== 'number') value = Number(value);
  if (isNaN(value)) return 'formatMoney仅支持数字或纯数字字符串';
  if (!digit || typeof digit !== 'number') digit = 2; // 小数点后位数

  value = value.toFixed(digit).toString();
  var list = value.split('.');
  var p = list[0].charAt(0) === '-' ? '-' : '';
  var num = p ? list[0].slice(1) : list[0];
  var result = '';

  while (num.length > 3) {
    result = ",".concat(num.slice(-3)).concat(result);
    num = num.slice(0, num.length - 3);
  }

  if (num) {
    result = num + result;
  }

  return "".concat(prefix, " ").concat(p).concat(result).concat(list[1] ? ".".concat(list[1]) : '');
}

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(formatMoney, "formatMoney", "/workspace/formPresenter/src/util/index.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();