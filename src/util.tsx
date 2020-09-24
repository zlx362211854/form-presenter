import React from 'react'
import {
  Input,
  Select,
  Radio,
  Switch,
  InputNumber,
  DatePicker,
  TimePicker,
} from 'antd'
import {formatMoney} from './util/index'
import Avatar from './formComponents/Avatar'
import PicturesWall from './formComponents/PicturesWall'
import {formLayoutEnums, uiTypeEnums} from './enums'

const RadioGroup = Radio.Group
const {MonthPicker, RangePicker} = DatePicker
export const UIKeyMap = {
  text: [uiTypeEnums.TEXT],
  info: [uiTypeEnums.INFO],
  input: [uiTypeEnums.INPUT],
  textArea: [uiTypeEnums.TEXTAREA],
  numberInput: [uiTypeEnums.NUMBER_INPUT],
  currencyInput: [uiTypeEnums.CURRENCY_INPUT],
  switch: [uiTypeEnums.SWITCH],
  select: [uiTypeEnums.SELECT],
  radio: [uiTypeEnums.RADIO],
  datePicker: [uiTypeEnums.DATE_PICKER],
  dateRangePicker: [uiTypeEnums.DATERANGE_PICKER],
  monthPicker: [uiTypeEnums.MONTH_PICKER],
  timePicker: [uiTypeEnums.TIME_PICKER],
  upload: [uiTypeEnums.UPLOAD],
  avatar: [uiTypeEnums.AVATAR],
  picturesWall: [uiTypeEnums.PICTURES_WALL],

  custom: [uiTypeEnums.CUSTOM],
}
const isNumber = (val: string): boolean => {
  return /(^[\-0-9][0-9]*(.[0-9]+)?)$/.test(val)
}
export const UIFunctionMap = new Map([
  [
    UIKeyMap.text,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(<Input disabled={true} />)
    },
  ],
  [
    UIKeyMap.info,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(
        <span style={formItem.style}>
          {formItem.prefix}
          {fieldInitValue}
          {formItem.suffix}
        </span>,
      )
    },
  ],
  [
    UIKeyMap.input,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(<Input prefix={formItem.prefix} suffix={formItem.suffix} disabled={formItem.disabled} />)
    },
  ],
  [
    UIKeyMap.textArea,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(<Input.TextArea rows={formItem.rows} />)
    },
  ],
  [
    UIKeyMap.numberInput,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(
        <InputNumber
          style={{width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto'}}
          min={formItem.min}
          max={formItem.max}
          formatter={(value: number): string => {
            if (!isNumber(value.toString())) return ''
            if (value) {
              return `${typeof formItem.prefix === 'undefined' ? '' : formItem.prefix}${value}${typeof formItem.suffix === 'undefined' ? '' : formItem.suffix
                }`
            }
          }}
          parser={(value: string): string => {
            if (!isNumber(value)) return ''
            if (value) {
              return value.replace(formItem.prefix, '').replace(formItem.suffix, '')
            }
          }}
          step={formItem.step}
          disabled={formItem.disabled}
        />,
      )
    },
  ],
  [
    UIKeyMap.currencyInput,
    (form, formItem, fieldInitValue, formLayout) => {
      const defaultRule = [
        {
          pattern: /(^[1-9][0-9]*(\.[0-9]{1,2})?$|^0*(\.[0-9]{1,2})?$)/,
          message: '请输入数字(小数点后最多两位)',
        }
      ]
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules ? formItem.rules.concat(defaultRule) : defaultRule,
        initialValue: fieldInitValue,
      })(
        <Input
          style={{width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto'}}
          disabled={formItem.disabled}
          prefix={formItem.prefix}
          suffix={formItem.suffix}
        />,
      )
    },
  ],
  [
    UIKeyMap.switch,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
        valuePropName: 'checked',
      })(<Switch disabled={formItem.disabled} />)
    },
  ],
  [
    UIKeyMap.select,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue && fieldInitValue.value,
      })(
        <Select
          placeholder=""
          disabled={formItem.disabled}
          getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
        >
          {fieldInitValue &&
            fieldInitValue.options &&
            fieldInitValue.options.map((option) => (
              <Select.Option
                value={option[formItem.selectOptions.key]}
                key={option[formItem.selectOptions.key]}
              >
                {option[formItem.selectOptions.title]}
              </Select.Option>
            ))}
        </Select>,
      )
    },
  ],
  [
    UIKeyMap.radio,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue && fieldInitValue.value,
      })(
        <RadioGroup disabled={formItem.disabled}>
          {fieldInitValue &&
            fieldInitValue.options &&
            fieldInitValue.options.map((option) => (
              <Radio
                value={option[formItem.radioOptions.key]}
                key={option[formItem.radioOptions.key]}
              >
                {option[formItem.radioOptions.title]}
              </Radio>
            ))}
        </RadioGroup>,
      )
    },
  ],
  [
    UIKeyMap.datePicker,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue && fieldInitValue.value,
      })(
        <DatePicker
          showTime={formItem.showTime}
          format={formItem.format}
          style={{width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto'}}
        />,
      )
    },
  ],
  [
    UIKeyMap.dateRangePicker,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue && fieldInitValue.value,
      })(
        <RangePicker
          showTime={formItem.showTime}
          format={formItem.format}
          style={{width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto'}}
        />,
      )
    },
  ],
  [
    UIKeyMap.monthPicker,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue && fieldInitValue.value,
      })(
        <MonthPicker style={{width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto'}} />,
      )
    },
  ],
  [
    UIKeyMap.timePicker,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue && fieldInitValue.value,
      })(
        <TimePicker
          format={formItem.format}
          style={{width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto'}}
        />,
      )
    },
  ],
  // [
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
  [
    UIKeyMap.avatar,
    (form, formItem, fieldInitValue, formLayout) => {
      const onChange = (value) => {
        form.setFieldsValue({
          [formItem.key]: value,
        })
      }
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(<Avatar {...formItem.uploadProps} initImageUrl={fieldInitValue} onChange={onChange} />)
    },
  ],
  [
    UIKeyMap.picturesWall,
    (form, formItem, fieldInitValue, formLayout) => {
      const onChange = (value) => {
        form.setFieldsValue({
          [formItem.key]: value,
        })
      }
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(
        <PicturesWall
          {...formItem.uploadProps}
          initImageUrls={fieldInitValue}
          onChange={onChange}
        />,
      )
    },
  ],
  [
    UIKeyMap.custom,
    (form, formItem, fieldInitValue, formLayout) => {
      const Custom = formItem.render
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue && fieldInitValue.value,
      })(<Custom></Custom>)
    },
  ],
])
