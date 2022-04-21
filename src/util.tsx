import React from 'react'
import { Checkbox, DatePicker, Input, InputNumber, Radio, Select, Switch, TimePicker, TreeSelect } from 'antd'
import Avatar from './formComponents/Avatar'
import PicturesWall from './formComponents/PicturesWall'
import { formLayoutEnums, uiTypeEnums } from './enums'
import moment from 'moment'
import Uploader from './formComponents/upload'
import _ from 'lodash'
const defaultImg = 'data:image/png;base64,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'

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
  imgSelect: [uiTypeEnums.IMG_SELECT],
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
  custom_native: [uiTypeEnums.CUSTOM_NATIVE],
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
          showSearch
          filterOption={(input, option) => {
            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }}
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
    UIKeyMap.imgSelect,
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
          showSearch
          filterOption={(input, option) => {
            return option.props?.children[1]?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0
          }}
        >
          {formItem.options
            ? formItem.options.map((option, index) => (
              <Select.Option value={option[key]} key={index}>
                <img style={{width: '30px', height: '30px'}} src={option && option.img ? option.img : defaultImg} alt=""/>
                {option[title]}
              </Select.Option>
            ))
            : fieldInitValue &&
            fieldInitValue.options &&
            fieldInitValue.options.map((option) => (
              <Select.Option value={option[key]} key={option[key]}>
                <img style={{width: '30px', height: '30px'}} src={option && option.img ? option.img : defaultImg} alt=""/>
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
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
        getValueFromEvent: (value) => {
          return (Array.isArray(value) && value.length === 1) ? value[0] : value
        },
        normalize: (value, preval, allval) => {
          return Array.isArray(value) && value.length === 1 ? value[0] : value;
        }
      })(
        <Avatar
          disabled={formItem.disabled}
          {...formItem.uploadProps}
          initImageUrls={typeof fieldInitValue === 'string' ? [fieldInitValue] : fieldInitValue}
        />,
      )
    },
  ],
  [
    UIKeyMap.picturesWall,
    (form, formItem, fieldInitValue, formLayout) => {
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
        getValueFromEvent: (value) => {
          return (Array.isArray(value) && value.length === 1) ? value[0] : value
        },
        normalize: (value, preval, allval) => {
          return Array.isArray(value) && value.length === 1 ? value[0] : value;
        }
      })(
        <PicturesWall
          {...formItem.uploadProps}
          initImageUrls={typeof fieldInitValue === 'string' ? [fieldInitValue] : fieldInitValue}
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
  ],
  [
    UIKeyMap.custom_native,
    (form, formItem, fieldInitValue, formLayout, _) => {
      const {renderItem} = formItem
      return form.getFieldDecorator(formItem.key, {
        rules: formItem.rules,
        initialValue: fieldInitValue,
      })(renderItem?.())
    },
  ],
])


