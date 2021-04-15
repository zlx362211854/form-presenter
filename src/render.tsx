import React from 'react';
import {
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TimePicker,
  TreeSelect,
} from 'antd';
import Avatar from './formComponents/Avatar';
import PicturesWall from './formComponents/PicturesWall';
import { formLayoutEnums, uiTypeEnums } from './enums';
import Uploader from './formComponents/upload';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { MonthPicker, RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;

export const UIKeyMap = {
  text: [uiTypeEnums.TEXT],
  info: [uiTypeEnums.INFO],
  input: [uiTypeEnums.INPUT],
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

  custom: [uiTypeEnums.CUSTOM],
};

export const UIFunctionMap = new Map([
  [
    UIKeyMap.text,
    (form, formItem, fieldInitValue, formLayout) => {
      return <Input disabled={true} />;
    },
  ],
  [
    UIKeyMap.info,
    (form, formItem, fieldInitValue, formLayout) => {
      return (
        <span style={formItem.style}>
          {formItem.prefix}
          {form.getFieldValue(formItem.key) || fieldInitValue}
          {formItem.suffix}
        </span>
      );
    },
  ],
  [
    UIKeyMap.input,
    (form, formItem, fieldInitValue, formLayout) => {
      return (
        <Input
          prefix={formItem.prefix}
          suffix={formItem.suffix}
          disabled={formItem.disabled}
          placeholder={formItem.placeholder}
        />
      );
    },
  ],
  [
    UIKeyMap.color,
    (form, formItem, fieldInitValue, formLayout) => {
      return <Input type="color" disabled={formItem.disabled} />;
    },
  ],
  [
    UIKeyMap.textArea,
    (form, formItem, fieldInitValue, formLayout) => {
      return <Input.TextArea rows={formItem.rows} placeholder={formItem.placeholder} style={formItem.fontSize ? {fontSize: formItem.fontSize} : {}}/>;
    },
  ],
  [
    UIKeyMap.numberInput,
    (form, formItem, fieldInitValue, formLayout) => {
      return (
        <InputNumber
          style={{ width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto' }}
          placeholder={formItem.placeholder}
          min={formItem.min}
          max={formItem.max}
          step={formItem.step}
          precision={formItem.precision}
          formatter={(value: number): string => {
            if (value) {
              return `${typeof formItem.prefix === 'undefined' ? '' : formItem.prefix}${value}${
                typeof formItem.suffix === 'undefined' ? '' : formItem.suffix
              }`;
            }
          }}
          parser={(value: string): string => {
            if (value) {
              return value.replace(formItem.prefix, '').replace(formItem.suffix, '');
            }
          }}
          step={formItem.step}
          disabled={formItem.disabled}
        />
      );
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
      ];
      return (
        <Input
          placeholder={formItem.placeholder}
          style={{ width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto' }}
          disabled={formItem.disabled}
          prefix={formItem.prefix}
          suffix={formItem.suffix}
        />
      );
    },
  ],
  [
    UIKeyMap.switch,
    (form, formItem, fieldInitValue, formLayout) => {
      return <Switch disabled={formItem.disabled} />;
    },
  ],
  [
    UIKeyMap.select,
    (form, formItem, fieldInitValue, formLayout) => {
      const key = (formItem.selectOptions && formItem.selectOptions.key) || 'key';
      const title = (formItem.selectOptions && formItem.selectOptions.title) || 'title';
      return (
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
        </Select>
      );
    },
  ],
  [
    UIKeyMap.radio,
    (form, formItem, fieldInitValue, formLayout) => {
      const key = (formItem.radioOptions && formItem.radioOptions.key) || 'key';
      const title = (formItem.radioOptions && formItem.radioOptions.title) || 'title';
      return (
        <RadioGroup disabled={formItem.disabled}>
          {formItem.options
            ? formItem.options.map((option, index) => (
                <Radio value={option[key]} key={option[key]}>
                  {option[title]}
                </Radio>
              ))
            : fieldInitValue &&
              fieldInitValue.options &&
              fieldInitValue.options.map((option, index) => (
                <Radio value={option[key]} key={option[key]}>
                  {option[title]}
                </Radio>
              ))}
        </RadioGroup>
      );
    },
  ],
  [
    UIKeyMap.checkbox,
    (form, formItem, fieldInitValue, formLayout) => {
      return (
        <CheckboxGroup disabled={formItem.disabled}>
          {formItem.options
            ? formItem.options.map((option, index) => (
                <Checkbox value={option[formItem.radioOptions.key]} key={index}>
                  {option[formItem.radioOptions.title]}
                </Checkbox>
              ))
            : fieldInitValue &&
              fieldInitValue.options &&
              fieldInitValue.options.map((option, index) => (
                <Checkbox value={option[formItem.radioOptions.key]} key={index}>
                  {option[formItem.radioOptions.title]}
                </Checkbox>
              ))}
        </CheckboxGroup>
      );
    },
  ],
  [
    UIKeyMap.datePicker,
    (form, formItem, fieldInitValue, formLayout) => {
      return (
        <DatePicker
          placeholder={formItem.placeholder}
          showTime={formItem.showTime}
          format={formItem.format}
          disabledDate={formItem.disabledDate}
          disabled={formItem.disabled}
          style={{ width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto' }}
        />
      );
    },
  ],
  [
    UIKeyMap.dateRangePicker,
    (form, formItem, fieldInitValue, formLayout) => {
      return (
        <RangePicker
          placeholder={formItem.placeholder}
          showTime={formItem.showTime}
          format={formItem.format}
          disabled={formItem.disabled}
          disabledDate={formItem.disabledDate}
          style={{ width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto' }}
        />
      );
    },
  ],
  [
    UIKeyMap.monthPicker,
    (form, formItem, fieldInitValue, formLayout) => {
      return (
        <MonthPicker
          style={{ width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto' }}
          placeholder={formItem.placeholder}
        />
      );
    },
  ],
  [
    UIKeyMap.timePicker,
    (form, formItem, fieldInitValue, formLayout) => {
      return (
        <TimePicker
          placeholder={formItem.placeholder}
          format={formItem.format}
          style={{ width: formLayout.type === formLayoutEnums.GRID ? '100%' : 'auto' }}
        />
      );
    },
  ],
  [
    UIKeyMap.upload,
    (form, formItem, fieldInitValue, formLayout) => {
      const onChange = (value) => {
        form.setFieldsValue({
          [formItem.key]: value,
        });
      };
      return (
        <Uploader
          form={form}
          {...formItem.uploadProps}
          initImageUrls={fieldInitValue}
          onChange={onChange}
        />
      );
    },
  ],
  [
    UIKeyMap.avatar,
    (form, formItem, fieldInitValue, formLayout) => {
      const onChange = (value) => {
        form.setFieldsValue({
          [formItem.key]: value,
        });
      };
      return (
        <Avatar
          disabled={formItem.disabled}
          {...formItem.uploadProps}
          initImageUrls={fieldInitValue && [fieldInitValue]}
          onChange={onChange}
        />
      );
    },
  ],
  [
    UIKeyMap.picturesWall,
    (form, formItem, fieldInitValue, formLayout) => {
      const onChange = (value) => {
        form.setFieldsValue({
          [formItem.key]: value,
        });
      };
      return (
        <PicturesWall
          {...formItem.uploadProps}
          initImageUrls={fieldInitValue}
          onChange={onChange}
        />
      );
    },
  ],
  [
    UIKeyMap.custom,
    (form, formItem, fieldInitValue, formLayout) => {
      const Custom = formItem.render;
      // 自定义渲染时返回form对象供使用
      return <Custom form={form} />;
    },
  ],
]);
