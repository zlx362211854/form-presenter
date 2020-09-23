"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

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

function getBase64(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      return resolve(reader.result);
    };

    reader.onerror = function (error) {
      return reject(error);
    };
  });
}

var PicturesWall = /*#__PURE__*/function (_React$Component) {
  _inherits(PicturesWall, _React$Component);

  var _super = _createSuper(PicturesWall);

  function PicturesWall() {
    var _temp, _this;

    _classCallCheck(this, PicturesWall);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _super.call.apply(_super, [this].concat(args)), _this.defaultFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'], _this.defaultFileSize = 2, _this.defaultMaxFileLength = 4, _this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      fileTypes: _this.props.fileTypes || _this.defaultFileTypes,
      fileSize: _this.props.fileSize || _this.defaultFileSize,
      maxFileLength: _this.props.maxFileLength || _this.defaultMaxFileLength
    }, _this.init = function (initImageUrls, origin) {
      console.log(initImageUrls, 'initImages3');

      if (initImageUrls) {
        // 获取全路径
        if (origin) {
          var imgsPromise = [];
          var service = new _imageService["default"]();
          initImageUrls && initImageUrls.forEach(function (i) {
            imgsPromise.push(service.getFullImageUrl(i));
          });
          Promise.all(imgsPromise).then(function (arr) {
            var fileList = arr.map(function (i, index) {
              return {
                uid: index,
                status: 'done',
                url: i.data,
                response: {
                  url: i.data
                }
              };
            });

            _this.setState({
              fileList: fileList
            });
          });
        } else {
          var fileList = initImageUrls.map(function (i, index) {
            return {
              uid: index,
              status: 'done',
              url: i,
              response: {
                url: i
              }
            };
          });

          _this.setState({
            fileList: fileList
          });
        }
      }
    }, _this.handleCancel = function () {
      return _this.setState({
        previewVisible: false
      });
    }, _this.handlePreview = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!file.url && !file.preview)) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return getBase64(file.originFileObj);

              case 3:
                file.preview = _context.sent;

              case 4:
                _this.setState({
                  previewImage: file.url || file.preview,
                  previewVisible: true
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), _this.handleChange = function (info) {
      var fileList = info.fileList;

      if (info.file.status === 'done' || info.file.status === 'removed') {
        var donefileList = fileList.filter(function (i) {
          return i.status === 'done';
        }).map(function (i) {
          return i.response.result;
        });

        _this.props.onChange(donefileList);
      }

      _this.setState({
        fileList: fileList
      });
    }, _this.beforeUpload = function (file) {
      var _this$state = _this.state,
          fileTypes = _this$state.fileTypes,
          fileSize = _this$state.fileSize;
      var isRightFileType = fileTypes.indexOf(file.type) !== -1;

      if (!isRightFileType) {
        _antd.message.error('不能上传该类型文件');
      }

      var isLt2M = file.size / 1024 / 1024 < fileSize;

      if (!isLt2M) {
        _antd.message.error('Image must smaller than 2MB!');
      }

      return isRightFileType && isLt2M;
    }, _temp));
  }

  _createClass(PicturesWall, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          _this$props$initImage = _this$props.initImageUrls,
          initImageUrls = _this$props$initImage === void 0 ? [] : _this$props$initImage,
          origin = _this$props.origin;
      this.init(initImageUrls, origin);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (newProps.initImageUrls && newProps.initImageUrls.length > 0 && this.props.initImageUrls.length === 0) {
        this.init(newProps.initImageUrls, newProps.origin);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          previewVisible = _this$state2.previewVisible,
          previewImage = _this$state2.previewImage,
          fileList = _this$state2.fileList,
          maxFileLength = _this$state2.maxFileLength;

      var uploadButton = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Icon, {
        type: "camera",
        style: {
          fontSize: '38px',
          marginBottom: '10px'
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-upload-text"
      }, "\u4E0A\u4F20"));

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "clearfix"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Upload, {
        action: this.props.action,
        listType: "picture-card",
        fileList: fileList,
        onPreview: this.handlePreview,
        beforeUpload: this.beforeUpload,
        onChange: this.handleChange,
        showUploadList: {
          showPreviewIcon: true,
          showRemoveIcon: true,
          showDownloadIcon: false
        }
      }, fileList.length >= maxFileLength ? null : uploadButton), /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        visible: previewVisible,
        footer: null,
        onCancel: this.handleCancel
      }, /*#__PURE__*/_react["default"].createElement("img", {
        alt: "example",
        style: {
          width: '100%'
        },
        src: previewImage
      })));
    }
  }]);

  return PicturesWall;
}(_react["default"].Component);

exports["default"] = PicturesWall;