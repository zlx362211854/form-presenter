import {FormProps} from 'antd'
export type uiType = 
  | 'text'
  | 'info'
  | 'title'
  | 'input'
  | 'textArea'
  | 'numberInput'
  | 'currencyInput'
  | 'switch'
  | 'select'
  | 'radio'
  | 'datePicker'
  | 'dateRangePicker'
  | 'monthPicker'
  | 'timePicker'
  | 'upload'
  | 'avatar'
  | 'picturesWall'
  | 'custom'

export enum uiTypeEnums {
  TEXT = 'text', // 文字
  INFO = 'info', // 文字
  TITLE = 'title', // fields组的title
  INPUT = 'input', // 输入框
  TEXTAREA = 'textArea', // 输入框
  NUMBER_INPUT = 'numberInput', // 数字输入框
  CURRENCY_INPUT = 'currencyInput', // 货币输入框
  SWITCH = 'switch', // 开关
  SELECT = 'select', // 下拉
  RADIO = 'radio', // 单选
  DATE_PICKER = 'datePicker', // 日期选择
  DATERANGE_PICKER = 'dateRangePicker', // 日期范围选择
  MONTH_PICKER = 'monthPicker', // 月份选择
  TIME_PICKER = 'timePicker', // 时间选择
  UPLOAD = 'upload', // 文件上传
  AVATAR = 'avatar', // 头像|图片上传
  PICTURES_WALL = 'picturesWall', // 图片墙

  CUSTOM = 'custom', // 自定义
}


export type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email'
  | 'any'

export interface RuleItem {
  type?: RuleType // default type is 'string'
  required?: boolean
  pattern?: RegExp | string
  min?: number // Range of type 'string' and 'array'
  max?: number // Range of type 'string' and 'array'
  len?: number // Length of type 'string' and 'array'
  enum?: Array<string | number | boolean | null | undefined> // possible values of type 'enum'
  whitespace?: boolean
  fields?: Rules // ignore when without required
  options?: ValidateOption
  defaultField?: {type: RuleType} // 'object' or 'array' containing validation rules
  transform?: (value: any) => any
  message?: string
  asyncValidator?: (
    rule: Rules,
    value: any,
    callback: (error: string | string[] | void) => void,
    source: ValidateSource,
    options: ValidateOption,
  ) => void | Promise<void>
  validator?: (
    rule: Rules,
    value: any,
    callback: (error: string | string[] | void) => void,
    source: ValidateSource,
    options: ValidateOption,
  ) => void
}

export interface Rules {
  [field: string]: RuleItem | RuleItem[]
}

export interface ValidateSource {
  [field: string]: any
}

export interface ValidateOption {
  // whether to suppress internal warning
  suppressWarning?: boolean

  // when the first validation rule generates an error stop processed
  first?: boolean

  // when the first validation rule of the specified field generates an error stop the field processed, 'true' means all fields.
  firstFields?: boolean | string[]
}

export interface ValidateError {
  message: string
  field: string
}

export type ErrorList = ValidateError[]
export interface FieldErrorList {
  [field: string]: ValidateError[]
}
// select组件的option
export interface SelectOptions {
  title: string
  key: string
}
export declare type ValidationRule = {
  /** validation error message */
  message?: React.ReactNode
  /** built-in validation type, available options: https://github.com/yiminghe/async-validator#type */
  type?: string
  /** indicates whether field is required */
  required?: boolean
  /** treat required fields that only contain whitespace as errors */
  whitespace?: boolean
  /** validate the exact length of a field */
  len?: number
  /** validate the min length of a field */
  min?: number
  /** validate the max length of a field */
  max?: number
  /** validate the value from a list of possible values */
  enum?: string | string[]
  /** validate from a regular expression */
  pattern?: RegExp
  /** transform a value before validation */
  transform?: (value: any) => any
  /** custom validate function (Note: callback must be called) */
  validator?: (rule: any, value: any, callback: any, source?: any, options?: any) => any
}
export interface IOptions {
  title: string
  key: string
}
export interface IuploadProps {
  action?: string // 上传文件的地址
  maxFileLength?: number // 上传的最大文件数量
  fileTypes?: string[] // 上传文件的类型
  fileSize?: number // 单个文件的大小 单位：MB
  origin?: boolean // 是否根据图片部分路径远程获取全路径
}
export interface IFormItem {
  label?: string // 字段的label
  key?: string // 字段在form中的key
  uiType?: uiType // 字段对应的ui类型
  rules?: ValidationRule[] // 字段的校验规则
  selectOptions?: IOptions // select类型的option
  radioOptions?: IOptions // radio类型的option
  min?: number // input number类型的最小值
  max?: number // input number类型的最大值
  prefix?: string // input number类型的前缀
  suffix?: string // input number类型的后缀
  step?: number | string // input number类型的小数点后位数
  rows?: number | string // textArea的行数
  disabled?: boolean // 是否禁用
  showTime?: boolean // datePicker & dateRangePicker 是否可选择时间
  format?: string // datePicker & dateRangePicker & timePicker 时间展示格式
  uploadProps?: IuploadProps
  extra?: string | Function
  divider?: boolean
  style?: any
  render?: any
}
export interface IFormItemLayout {
  labelCol?: ICol
  wrapperCol?: ICol
}
export type ICol = {
  span: number
}
export interface IFormPresenter {
  formItems: IFormItem[]
  initFormValues?: any
  onFieldsChange?: Function
  onValuesChange?: Function
}

export interface IFormProps extends FormProps {
  // self props
}

export interface IformLayout extends IFormItemLayout {
  type: string
  col?: number
}
export interface IFormCreator extends FormProps {
  formItems: IFormItem[]
  initFormValues?: any
  loading?: boolean
  wrapperClassName?: any
  disableSubmitButton?: boolean // 不展示提交按钮
  formLayout?: IformLayout
  triggerListener?: (type: string, params?: any) => void
}
export declare type FormCreateOptionMessagesCallback = (...args: any[]) => string

export interface EntityFormLifecycle {
  /** 表单被创建 */
  onFormCreated?: (form: IFormProps['form']) => void
  /** 表单组件被加载 */
  onFormMount?: () => void
  /** 表单组件被销毁 */
  onFormDestroy?: () => void
}
export interface FormCreateOptionMessages {
  [messageId: string]: string | FormCreateOptionMessagesCallback | FormCreateOptionMessages
}
type IRewriteForm = {
  validateFields: (any) => void;
  validateFieldsAndScroll: (any) => void;
} & FormProps['form'];

export interface IFormPresenterOptions {
  formItems: IFormItem[];
  initFormValues?: any;
  formLayout?: IformLayout;
  onFieldsChange?: (props: FormProps, fields: any, allFields: any) => void; // 表单字段改变
  onValuesChange?: (props: FormProps, changedValues: any, allValues: any) => void; // 表单字段值改变
  disableSubmitButton?: boolean; // 不展示默认提交按钮
  onSubmit?: (values: any) => void; // 默认提交按钮 校验成功回调
  onSubmitFailed?: (onSubmitFailed: any[], form: IRewriteForm) => void; // 默认提交按钮 校验失败成功回调

  /* life cycle */
  /** 表单被创建 */
  onFormCreated?: (form: IRewriteForm) => void;
  /** 表单组件被加载 */
  onFormMount?: () => void;
  /** 表单组件被销毁 */
  onFormDestroy?: () => void;
}
export default class FormPresenter<IFormPresenterOptions> {
  constructor(options: IFormPresenterOptions)
  private initForm(formItems: IFormItem[], initFormValues, rest?: any): void
  public setInitformValues(initFormValues: any): void 
  public getFormComponent(): React.ComponentClass
  public getForm():  IRewriteForm
  public getFormItems():  IFormItem[]
  public addFormItem(formItem: IFormItem, index?: number): void
  public updateFormItem(formItem: IFormItem): void
  public hasField(key: string): boolean
  public resetFields(): void
}
