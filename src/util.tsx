import React from 'react'
import { Checkbox, DatePicker, Input, InputNumber, Radio, Select, Switch, TimePicker, TreeSelect } from 'antd'
import Avatar from './formComponents/Avatar'
import PicturesWall from './formComponents/PicturesWall'
import { formLayoutEnums, uiTypeEnums } from './enums'
import moment from 'moment'
import Uploader from './formComponents/upload'
import _ from 'lodash'

const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const { MonthPicker, RangePicker } = DatePicker
const { TreeNode } = TreeSelect

export const UIKeyMap = {
  text: [uiTypeEnums.TEXT],
  info: [uiTypeEnums.INFO],
  input: [uiTypeEnums.INPUT],
  inputRange: [uiTypeEnums.INPUT_RANGE],
  color: [uiTypeEnums.COLOR],
  textArea: [uiTypeEnums.TEXTAREA],
  numberInput: [uiTypeEnums.NUMBER_INPUT],
  currencyInput: [uiTypeEnums.CURRENCY_INPUT],
  switch: [uiTypeEnums.SWITCH],
  select: [uiTypeEnums.SELECT],
  radio: [uiTypeEnums.RADIO],
  checkbox: [uiTypeEnums.CHECKBOX],
  datePicker: [uiTypeEnums.DATE_PICKER],
  dateRangePicker: [uiTypeEnums.DATERANGE_PICKER],
  monthPicker: [uiTypeEnums.MONTH_PICKER],
  timePicker: [uiTypeEnums.TIME_PICKER],
  upload: [uiTypeEnums.UPLOAD],
  avatar: [uiTypeEnums.AVATAR],
  picturesWall: [uiTypeEnums.PICTURES_WALL],
  treeSelect: [uiTypeEnums.TREESELECT],
  custom: [uiTypeEnums.CUSTOM],
}


const __predealData = (__data, addtionSelet?: any[]) => {
  const data = _.cloneDeep(__data)
  let temp = []
  data.forEach((val, index) => {
    if (!val.pid || (val.pid == 0)) {
      val.key = `0-${index}`
      data[index].key = `0-${index}`
      temp.push(val)
    }
  })

  // 查找子元素
  function findChild(temp) {
    temp.forEach((col, i) => {
      if (find(col.id).length > 0) {
        col.children = find(col.id)
        col.children.forEach((con, num) => {
          con.key = col.key + '-' + num
          data.forEach((val, index) => {
            if (val.id === con.id) {
              val.key = col.key + '-' + num
            }
          })
        })
        findChild(col.children)
      }
    })
    return temp
  }

  // 看是否有子元素
  function find(id) {
    const temp = []
    data.forEach((v) => {
      if (v.pid === id) {
        temp.push(v)
      }
    })
    return temp
  }

  if (addtionSelet) {
    temp = addtionSelet
  }

  temp = findChild(temp)

  return temp
}
const renderTreeNodes = (data, __key, __title) => {
  return data.map((item) => {
    if (item?.children) {
      return (
        <TreeNode title={item[__title]} value={item.id} key={item[__key]} dataRef={item}>
          {renderTreeNodes(item.children, __key, __title)}
        </TreeNode>
      )
    }
    return <TreeNode title={item[__title]} value={item.id} key={item[__key]} {...item} />
  })
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
          {form.getFieldValue(formItem.key) || fieldInitValue}
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
      })(<Input prefix={formItem.prefix} suffix={formItem.suffix} disabled={formItem.disabled} placeholder={formItem.placeholder} onChange={(e) => formItem.onChange?.(e)} onBlur={(e) => formItem.onBlur?.(e)} />)
    },
  ],
  [
    UIKeyMap.inputRange,
    (form, formItem, fieldInitValue = [], formLayout) => {
      const onChange = (e, index) => {
        const value = e.target.value
        const newVal = form.getFieldValue(formItem.key)
        newVal[index] = value
        form.setFieldsValue({
          [formItem.key]: newVal,
        })
      }
      const val = form.getFieldValue(formItem.key)
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(
        <Input.Group compact>
          <Input style={{ width: '40%' }} value={val?.[0]} onChange={(e) => onChange(e, 0)} />
          <div style={{ width: '10%', lineHeight: '32px', textAlign: 'center' }}>～</div>
          <Input style={{ width: '40%' }} value={val?.[1]} onChange={(e) => onChange(e, 1)} />
        </Input.Group>
      )
    },
  ],
  [
    UIKeyMap.color,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(<Input type="color" disabled={formItem.disabled} />)
    },
  ],
  [
    UIKeyMap.textArea,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(<Input.TextArea rows={formItem.rows} placeholder={formItem.placeholder} />)
    },
  ],
  [
    UIKeyMap.numberInput,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(
        // 有精度要求的就不format
        typeof formItem.precision !== 'undefined' ? <InputNumber
          style={{ width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto' }}
          placeholder={formItem.placeholder}
          min={formItem.min}
          max={formItem.max}
          precision={formItem.precision}
          step={formItem.step}
          disabled={formItem.disabled}
        /> : <InputNumber
            style={{ width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto' }}
            placeholder={formItem.placeholder}
            min={formItem.min}
            max={formItem.max}
            formatter={(value: number): string => {
              if (value) {
                return `${typeof formItem.prefix === 'undefined' ? '' : formItem.prefix}${value}${typeof formItem.suffix === 'undefined' ? '' : formItem.suffix
                  }`
              }
            }}
            parser={(value: string): string => {
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
        },
      ]
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules ? formItem.rules.concat(defaultRule) : defaultRule,
        initialValue: fieldInitValue,
      })(
        <Input
          placeholder={formItem.placeholder}
          style={{ width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto' }}
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
      const key = (formItem.selectOptions && formItem.selectOptions.key) || 'key'
      const title = (formItem.selectOptions && formItem.selectOptions.title) || 'title'
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue:
          fieldInitValue &&
          (typeof fieldInitValue !== 'object' ? fieldInitValue : fieldInitValue.value),
      })(
        <Select
          placeholder={formItem.placeholder}
          mode={formItem.multiple ? 'multiple' : ''}
          optionFilterProp={formItem.filterKey || 'children'}
          disabled={formItem.disabled}
          getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
        >
          {formItem.options
            ? formItem.options.map((option, index) => (
              <Select.Option value={option[key]} key={index}>
                {option[title]}
              </Select.Option>
            ))
            : fieldInitValue &&
            fieldInitValue.options &&
            fieldInitValue.options.map((option) => (
              <Select.Option value={option[key]} key={option[key]}>
                {option[title]}
              </Select.Option>
            ))}
        </Select>,
      )
    },
  ],
  [
    UIKeyMap.treeSelect,
    (form, formItem, fieldInitValue, formLayout) => {
      const key = (formItem.selectOptions && formItem.selectOptions.key) || 'key'
      const title = (formItem.selectOptions && formItem.selectOptions.title) || 'title'
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue:
          fieldInitValue &&
          (typeof fieldInitValue !== 'object' ? fieldInitValue : fieldInitValue.value),
      })(formItem.renderByTreeData ? <TreeSelect
        showSearch={false}
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder={formItem.placeholder}
        allowClear
        disabled={formItem.disabled}
        treeDefaultExpandAll
        treeData={formItem.options}
      /> : <TreeSelect
        showSearch={false}
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder={formItem.placeholder}
        allowClear
        disabled={formItem.disabled}
        treeDefaultExpandAll
      >
          {formItem.options &&
            renderTreeNodes(__predealData(formItem.options, formItem?.addtionSelet), key, title)}
        </TreeSelect>
        ,
      )
    },
  ],
  [
    UIKeyMap.radio,
    (form, formItem, fieldInitValue, formLayout) => {
      const key = (formItem.radioOptions && formItem.radioOptions.key) || 'key'
      const title = (formItem.radioOptions && formItem.radioOptions.title) || 'title'
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        // radio 在form中，initialValue为false时会认为radio有值，导致非空校验失效，需手动设置成undefined
        initialValue:
          typeof fieldInitValue !== 'undefined'
            ? typeof fieldInitValue !== 'object'
              ? fieldInitValue
              : fieldInitValue?.value
            : undefined,
      })(
        <RadioGroup disabled={formItem.disabled}>
          {formItem.options
            ? formItem.options.map((option, index) => (
              <Radio value={option[key]} key={option[key]}>
                {formItem.renderItem ? formItem.renderItem(option) : option[title]}
              </Radio>
            ))
            : fieldInitValue &&
            fieldInitValue.options &&
            fieldInitValue.options.map((option, index) => (
              <Radio value={option[key]} key={option[key]}>
                {formItem.renderItem ? formItem.renderItem(option) : option[title]}
              </Radio>
            ))}
        </RadioGroup>,
      )
    },
  ],
  [
    UIKeyMap.checkbox,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(
        <CheckboxGroup disabled={formItem.disabled}>
          {formItem.options
            ? formItem.options.map((option, index) => {
              return (
                <Checkbox value={option[formItem.radioOptions.key]} key={index} >
                  {formItem.renderItem ? formItem.renderItem(option) : option[formItem.radioOptions.title]}
                </Checkbox>
              )
            })
            : fieldInitValue &&
            fieldInitValue.options &&
            fieldInitValue.options.map((option, index) => (
              <Checkbox value={option[formItem.radioOptions.key]} key={index} >
                {formItem.renderItem ? formItem.renderItem(option) : option[formItem.radioOptions.title]}
              </Checkbox>
            ))}
        </CheckboxGroup>,
      )
    },
  ],
  [
    UIKeyMap.datePicker,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: typeof fieldInitValue === 'string' ? moment(fieldInitValue) : fieldInitValue,
      })(
        <DatePicker
          placeholder={formItem.placeholder}
          showTime={formItem.showTime}
          format={formItem.format}
          disabledDate={formItem.disabledDate}
          disabled={formItem.disabled}
          style={{ width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto' }}
        />,
      )
    },
  ],
  [
    UIKeyMap.dateRangePicker,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(
        <RangePicker
          placeholder={formItem.placeholder}
          showTime={formItem.showTime}
          format={formItem.format}
          disabled={formItem.disabled}
          disabledDate={formItem.disabledDate}
          style={{ width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto' }}
        />,
      )
    },
  ],
  [
    UIKeyMap.monthPicker,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(
        <MonthPicker style={{ width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto' }} placeholder={formItem.placeholder} />,
      )
    },
  ],
  [
    UIKeyMap.timePicker,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(
        <TimePicker
          placeholder={formItem.placeholder}
          format={formItem.format}
          style={{ width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto' }}
        />,
      )
    },
  ],
  [
    UIKeyMap.upload,
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
        <Uploader
          form={form}
          {...formItem.uploadProps}
          initImageUrls={fieldInitValue}
          onChange={onChange}
        />,
      )
    }
  ],
  [
    UIKeyMap.avatar,
    (form, formItem, fieldInitValue, formLayout) => {
      const onChange = (value) => {
        form.setFieldsValue({
          [formItem.key]: (Array.isArray(value) && value.length === 1) ? value[0] : value,
        })
      }
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(
        <Avatar
          disabled={formItem.disabled}
          {...formItem.uploadProps}
          initImageUrls={fieldInitValue && [fieldInitValue]}
          onChange={onChange}
        />,
      )
    },
  ],
  [
    UIKeyMap.picturesWall,
    (form, formItem, fieldInitValue, formLayout) => {
      const onChange = (value) => {
        form.setFieldsValue({
          [formItem.key]: (Array.isArray(value) && value.length === 1) ? value[0] : value,
        })
      }
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(
        <PicturesWall
          {...formItem.uploadProps}
          initImageUrls={typeof fieldInitValue === 'string' ? [fieldInitValue] : fieldInitValue}
          onChange={onChange}
        />,
      )
    },
  ],
  [
    UIKeyMap.custom,
    (form, formItem, fieldInitValue, formLayout, initFormValues?: any) => {
      const Custom = formItem.render
      // 自定义渲染时返回form对象供使用
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue && fieldInitValue.value
      })(<Custom form={form} fieldInitValue={fieldInitValue} formItem={formItem} initFormValues={initFormValues} />)
    },
  ]
])


