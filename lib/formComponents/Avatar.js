"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _antd = require("antd");

var _react = _interopRequireDefault(require("react"));

var _imageService = _interopRequireDefault(require("./imageService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

// @ts-ignore
// import styles from './avatar.less'
function getBase64(img, callback) {
  var reader = new FileReader();
  reader.addEventListener('load', function () {
    return callback(reader.result);
  });
  reader.readAsDataURL(img);
}

function convertImgToBase64(url, callback, outputFormat) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.crossOrigin = 'Anonymous';

  img.onload = function () {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL(outputFormat || 'image/png');
    callback.call(this, dataURL);
    canvas = null;
  };

  img.src = url;
}

function beforeUpload(file) {
  var isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    _antd.message.error('You can only upload JPG/PNG file!');
  }

  var isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    _antd.message.error('Image must smaller than 2MB!');
  }

  return isJpgOrPng && isLt2M;
}

var imageService = new _imageService["default"]();

var Avatar = /*#__PURE__*/function (_React$Component) {
  _inherits(Avatar, _React$Component);

  var _super = _createSuper(Avatar);

  function Avatar() {
    var _temp, _this;

    _classCallCheck(this, Avatar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _super.call.apply(_super, [this].concat(args)), _this.state = {
      loading: false,
      imageUrl: ''
    }, _this.handleChange = function (info) {
      if (info.file.status === 'uploading') {
        _this.setState({
          loading: true
        });

        return;
      }

      if (info.file.status === 'done') {
        if (info.file.response && info.file.response.result) {
          _this.props.onChange(info.file.response.result);
        } // Get this url from response in real world.


        getBase64(info.file.originFileObj, function (imageUrl) {
          return _this.setState({
            imageUrl: imageUrl,
            loading: false
          });
        });
      }
    }, _this.getFullImageUrl = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(img) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // const IMAGE_THUMBNAIL_PARAM_ALIOSS = '?x-oss-process=image/resize,m_lfit,h_400,w_400';
                imageService.getFullImageUrl(img).then(function (imgUrl) {
                  if (imgUrl) {
                    // thumbnail = imgUrl.split('?')[0] + IMAGE_THUMBNAIL_PARAM_ALIOSS;
                    _this.setState({
                      imageUrl: imgUrl
                    });
                  }
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), _temp));
  }

  _createClass(Avatar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var initImageUrl = this.props.initImageUrl;

      if (initImageUrl) {
        this.getFullImageUrl(initImageUrl);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var uploadButton = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Icon, {
        type: this.state.loading ? 'loading' : 'plus'
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-upload-text"
      }, "Upload"));

      var imageUrl = this.state.imageUrl;
      return /*#__PURE__*/_react["default"].createElement(_antd.Upload, {
        name: "file",
        listType: "picture-card" // className={styles.avatar_uploader}
        ,
        showUploadList: false,
        action: this.props.action,
        beforeUpload: beforeUpload,
        onChange: this.handleChange
      }, imageUrl ? /*#__PURE__*/_react["default"].createElement("img", {
        src: imageUrl,
        alt: "avatar",
        style: {
          width: '100%'
        }
      }) : uploadButton);
    }
  }]);

  return Avatar;
}(_react["default"].Component);

exports["default"] = Avatar;