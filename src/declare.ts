import { FormProps, Rule } from 'antd/es/form';
export type uiType =
  | 'text'
  | 'info'
  | 'title'
  | 'input'
  | 'color'
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
  | 'button'
  | 'treeSelect'
  | 'custom'
  | 'checkbox'
  | 'pageSelect'
  | 'checkboxTab'
  | 'ueditor'
  | 'goods_list'
  | 'goods_single'
  | 'attachment'
  | 'model_id'
  | 'reduce_rule'
  | 'map_lon_lat'


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
  defaultField?: { type: RuleType } // 'object' or 'array' containing validation rules
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
  asyncValidator?: (...args: any[]) => any;
}
export interface IOptions {
  title: string
  key: string
}
export interface IuploadProps {
  name?: string
  action?: string // 上传文件的地址
  maxFileLength?: number // 上传的最大文件数量
  fileTypes?: string[] // 上传文件的类型
  fileSize?: number // 单个文件的大小 单位：MB
  origin?: boolean // 是否根据图片部分路径远程获取全路径
}
export interface IRenderProps {
  form: FormProps['form']
  formItem: IFormItem
  fieldInitValue: any
  formLayout: IFormItemLayout
  initFormValues: any
}
export interface IFormItem {
  label?: string // 字段的label
  key?: string // 字段在form中的key
  uiType?: uiType // 字段对应的ui类型
  rules?: Rule[] // 字段的校验规则
  options?: any[] //
  renderByTreeData?: boolean // treeSelect 组件是否根据treeData渲染
  multiple?: boolean // select 是否可多选
  filterKey?: 'children' | 'value' // 当多选的时候，根据什么来筛选，childern表示根据展示的label， value表示根据值
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
  disabledDate?: (current) => boolean
  uploadProps?: IuploadProps
  extra?: string | Function
  divider?: boolean
  style?: any
  render?: (props: IRenderProps) => any // 自定义渲染时返回form对象供使用
  itemAtion?: (current) => any
  hideItem?: boolean
  addtionSelet?: any[]
  placeholder?: string
  precision?: any
}
export interface IFormItemLayout {
  labelCol?: ICol
  wrapperCol?: ICol
}
type ICol = {
  span: number
}
export interface IFormPresenter {
  formItems: IFormItem[]
  initFormValues?: any
  onFieldsChange?: Function
  onValuesChange?: Function
}
export interface IformLayout extends IFormItemLayout {
  type: string
  col?: number
}