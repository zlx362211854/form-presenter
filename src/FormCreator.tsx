import React from 'react'
import { Spin, Button, Row, Col, Divider, } from 'antd'
import { FormProps } from 'antd/es/form';
import { IFormItem } from './declare'
import { UIFunctionMap, UIKeyMap } from './util'
import { IformLayout } from './FormPresenter'
import { formLayoutEnums, FORM_TITEMS, uiTypeEnums } from './enums'

import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
const FormItem = Form.Item
const defaultFormItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const defaultFormItemLayoutWithoutLabel = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 14,
    offset: 6
  },
}
export interface IFormCreator extends FormProps {
  formItems: IFormItem[]
  initFormValues?: any
  loading?: boolean
  wrapperClassName?: any
  disableSubmitButton?: boolean // 不展示提交按钮
  formLayout?: IformLayout
  triggerListener?: (type: string, params?: any) => void
  onSubmit?: (values) => void
}
export default class FormCreator extends React.Component<IFormCreator> {

  state = {
    __options: []
  }
  componentDidMount() {
    if (this.props.triggerListener) {
      this.props.triggerListener('formMountListener', null)
    }
  }

  shouldComponentUpdate() {
    return true
  }

  componentWillUnmount() {
    if (this.props.triggerListener) {
      this.props.triggerListener('formDestroyListener', null)
    }
  }
  /**
   * @description: render表单字段
   * @param {type}
   * @return:
   */

  private renderField = (formItem: IFormItem): React.ReactNode | string => {
    const { form, initFormValues, formLayout } = this.props
    let fieldInitValue = initFormValues[formItem.key]
    const keyString = formItem.key;
    let _fieldInitValue = keyString?.split('.').reduce((pr, cuur, inde, arr) => {
      return pr[cuur]
    }, initFormValues)
    if (!fieldInitValue && _fieldInitValue) {
      fieldInitValue = _fieldInitValue;
    }
    let uiKey
    const UIKeyMapArray = Object.keys(UIKeyMap)
    for (let i = 0; i < UIKeyMapArray.length; i++) {
      if (UIKeyMap[UIKeyMapArray[i]].find((k) => k === formItem.uiType)) {
        uiKey = UIKeyMapArray[i]
        break
      }
    }

    if (uiKey) {
      return UIFunctionMap.get(UIKeyMap[uiKey])?.(form, formItem, fieldInitValue, formLayout, initFormValues)
    } else {
      return '不存在的formField UI类型:' + formItem.uiType
    }
  }

  /**
   * @description: render表单布局
   * @param {type} formItems：IFormItem[]
   * @return:
   */

  private renderLayout = (formItems: IFormItem[]) => {
    let _formItems = formItems.filter(val => !val?.hideItem);
    const { formLayout } = this.props
    if (formLayout?.type === formLayoutEnums.FLOW) {
      return _formItems.map((formItem, index) => {
        let itemLayout
        // 可以自定义布局比例
        if (formLayout.labelCol && formLayout.wrapperCol) {
          itemLayout = {
            labelCol: formLayout.labelCol,
            wrapperCol: formLayout.wrapperCol,
          }
        } else {
          itemLayout = defaultFormItemLayout
        }
        if (formItem.divider) {
          return <Divider key={index} style={{ background: '#EBEBEB' }} />
        }
        let extra
        if (typeof formItem.extra === 'string') {
          extra = formItem.extra
        } else if (typeof formItem.extra === 'function') {
          const { initFormValues, form } = this.props
          const fieldInitValue = initFormValues[formItem.key] || form?.getFieldValue(formItem.key)
          extra = formItem.extra(fieldInitValue)
        }

        if (formItem.uiType === uiTypeEnums.TITLE) {
          const Label = (props) => {
            return (
              <span style={{ margin: '0', padding: '0 20px', fontSize: '18px', color: '#000' }}>
                {props.label}
              </span>
            )
          }
          return (
            <FormItem
              {...itemLayout}
              colon={false}
              label={<Label label={formItem.label} />}
              key={formItem.label}
            >
              <span style={{ color: '#878787' }}>{formItem.extra}</span>
            </FormItem>
          )
        }

        if (formItem.uiType === uiTypeEnums.BUTTON) {
          return (
            <FormItem
              {...defaultFormItemLayoutWithoutLabel}
              colon={false}
              label={''}
              key={formItem.label}
            >
              <Button type="primary" onClick={formItem.itemAtion}>{formItem.label}</Button>
            </FormItem>
          )
        }
        
        return (
          <FormItem {...itemLayout} label={formItem.label} key={formItem.key} extra={extra}>
            {this.renderField(formItem)}
          </FormItem>
        )
      })
    }

    return (
      <Row gutter={24}>
        {formItems.map((formItem) => {
          // 可以自定义布局比例
          let itemLayout
          if (formLayout?.labelCol && formLayout.wrapperCol) {
            itemLayout = {
              labelCol: formLayout.labelCol,
              wrapperCol: formLayout.wrapperCol,
            }
          } else {
            itemLayout = defaultFormItemLayout
          }
          return (
            <Col span={formLayout?.col} key={formItem.key}>
              <FormItem
                {...itemLayout}
                label={formItem.label}
                key={formItem.key}
                extra={formItem.extra}
              >
                {this.renderField(formItem)}
              </FormItem>
            </Col>
          )
        })}
      </Row>
    )

  }

  private handleSubmit = (e) => {
    const { form, onSubmit } = this.props
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Form返回的值为：', values)
        onSubmit && onSubmit(values)
      }
    })
  }
  render() {
    const { form, loading = false, disableSubmitButton, wrapperClassName } = this.props
    const formItems = form.getFieldValue(FORM_TITEMS)
    return (
      <div className={wrapperClassName}>
        <Spin spinning={loading}>
          <Form onSubmit={this.handleSubmit}>
            {this.renderLayout(formItems)}
            {!disableSubmitButton && (
              <Form.Item wrapperCol={{ span: 24, offset: 12 }}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            )}
          </Form>
        </Spin>
      </div>
    )
  }
}
