"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ALIYUN_OSS_HW_PARAMS = exports.ALIYUN_OSS_URL = exports.URL_GET_PICTURE_URL = void 0;

var _axios = _interopRequireDefault(require("axios"));

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

var SERVICE_ENDPOINT = '/services/';
var URL_GET_PICTURE_URL = SERVICE_ENDPOINT + 'fileDownload?returnType=url';
exports.URL_GET_PICTURE_URL = URL_GET_PICTURE_URL;
var ALIYUN_OSS_URL = '.oss-cn-beijing.aliyuncs.com';
exports.ALIYUN_OSS_URL = ALIYUN_OSS_URL;
var ALIYUN_OSS_HW_PARAMS = '?x-oss-process';
exports.ALIYUN_OSS_HW_PARAMS = ALIYUN_OSS_HW_PARAMS;

var ImageService = /*#__PURE__*/function () {
  function ImageService() {
    var _this = this;

    _classCallCheck(this, ImageService);

    this.show = function (img) {
      var onComplete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (imgUrl) {};

      if (img.indexOf(ALIYUN_OSS_URL) > -1) {
        if (img.indexOf(ALIYUN_OSS_HW_PARAMS) > -1) {
          var imgUrl = img.substring(0, img.indexOf(ALIYUN_OSS_HW_PARAMS));
          onComplete(imgUrl);
        } else {
          onComplete(img);
        }
      } else {
        (0, _axios["default"])({
          method: 'get',
          url: URL_GET_PICTURE_URL + '&filePath=' + img,
          responseType: 'text'
        }).then(function (res) {
          onComplete(res);
        });
      }
    };

    this.getFullImageUrl = function (img) {
      return new Promise(function (resolve) {
        _this.show(img, function (imgUrl) {
          if (imgUrl) {
            resolve(imgUrl);
          }
        });
      });
    };
  }

  _createClass(ImageService, [{
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return ImageService;
}();

exports["default"] = ImageService;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SERVICE_ENDPOINT, "SERVICE_ENDPOINT", "/workspace/formPresenter/src/formComponents/imageService.ts");
  reactHotLoader.register(URL_GET_PICTURE_URL, "URL_GET_PICTURE_URL", "/workspace/formPresenter/src/formComponents/imageService.ts");
  reactHotLoader.register(ALIYUN_OSS_URL, "ALIYUN_OSS_URL", "/workspace/formPresenter/src/formComponents/imageService.ts");
  reactHotLoader.register(ALIYUN_OSS_HW_PARAMS, "ALIYUN_OSS_HW_PARAMS", "/workspace/formPresenter/src/formComponents/imageService.ts");
  reactHotLoader.register(ImageService, "ImageService", "/workspace/formPresenter/src/formComponents/imageService.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();