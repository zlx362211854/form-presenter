import React from 'react'
import {Form, Spin, Button, Row, Col, Divider} from 'antd'
import {FormProps} from 'antd/es/form';
import {IFormItem} from './declare'
import {UIFunctionMap, UIKeyMap} from './util'
import {IformLayout} from './FormPresenter'
import {formLayoutEnums, FORM_TITEMS, uiTypeEnums} from './enums'

const FormItem = Form.Item
const defaultFormItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
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
}
export default class FormCreator extends React.Component<IFormCreator> {

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
    const {form, initFormValues, formLayout} = this.props
    const fieldInitValue = initFormValues[formItem.key]
    let uiKey
    const UIKeyMapArray = Object.keys(UIKeyMap)
    for (let i = 0; i < UIKeyMapArray.length; i++) {
      if (UIKeyMap[UIKeyMapArray[i]].find((k) => k === formItem.uiType)) {
        uiKey = UIKeyMapArray[i]
        break
      }
    }
    if (uiKey) {
      return UIFunctionMap.get(UIKeyMap[uiKey])(form, formItem, fieldInitValue, formLayout)
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
    const {formLayout} = this.props
    if (formLayout.type === formLayoutEnums.FLOW) {
      return formItems.map((formItem, index) => {
        let itemLayout
        // 流式布局可以自定义布局比例
        if (formLayout.labelCol && formLayout.wrapperCol) {
          itemLayout = {
            labelCol: formLayout.labelCol,
            wrapperCol: formLayout.wrapperCol,
          }
        } else {
          itemLayout = defaultFormItemLayout
        }
        if (formItem.divider) {
          return <Divider key={index} style={{background: '#EBEBEB'}} />
        }
        let extra
        if (typeof formItem.extra === 'string') {
          extra = formItem.extra
        } else if (typeof formItem.extra === 'function') {
          const {initFormValues} = this.props
          const fieldInitValue = initFormValues[formItem.key]
          extra = formItem.extra(fieldInitValue)
        }
        if (formItem.uiType === uiTypeEnums.TITLE) {
          const Label = (props) => {
            return (
              <span style={{margin: '0', padding: '0 20px', fontSize: '18px', color: '#000'}}>
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
              <span style={{color: '#878787'}}>{formItem.extra}</span>
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
          return (
            <Col span={formLayout.col} key={formItem.key}>
              <FormItem
                {...defaultFormItemLayout}
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
    const {form, onSubmit} = this.props
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Form返回的值为：', values)
        onSubmit && onSubmit(values)
      }
    })
  }
  render() {
    const {form, loading = false, disableSubmitButton, wrapperClassName} = this.props
    const formItems = form.getFieldValue(FORM_TITEMS)
    return (
      <div style={{overflowX: 'hidden'}} className={wrapperClassName}>
        <Spin spinning={loading}>
          <Form onSubmit={this.handleSubmit}>
            {this.renderLayout(formItems)}
            {!disableSubmitButton && (
              <Form.Item wrapperCol={{span: 24, offset: 12}}>
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
