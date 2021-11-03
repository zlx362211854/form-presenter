/**
 * @description: 公共EntityForm组件生成器
 * @param {type}
 * @return:
 */
import React from 'react'
import { FormProps } from '@ant-design/compatible/es/form';
import FromCreator, { IFormCreator } from './FormCreator'
import { IFormItem, IFormItemLayout } from './declare'
import { formLayoutEnums, FORM_TITEMS } from './enums'
import { FormLifecycle } from './FormLifecycle'
import { observable } from 'mobx';
import { Form } from '@ant-design/compatible';
export interface IFormProps extends FormProps {
  // self props
}

export interface EntityFormLifecycle {
  /** 表单被创建 */
  onFormCreated?: (form: IFormProps['form']) => void
  /** 表单组件被加载 */
  onFormMount?: () => void
  /** 表单组件被销毁 */
  onFormDestroy?: () => void
}

declare type FormCreateOptionMessagesCallback = (...args: any[]) => string

interface FormCreateOptionMessages {
  [messageId: string]: string | FormCreateOptionMessagesCallback | FormCreateOptionMessages
}

export interface IFormPresenterProps extends EntityFormLifecycle, IFormCreator {
  onFieldsChange?: (props: FormProps, fields: any, allFields: any) => void
  onValuesChange?: (props: FormProps, changedValues: any, allValues: any) => void
  mapPropsToFields?: (props: FormProps) => void
  validateMessages?: FormCreateOptionMessages
  withRef?: boolean
  name?: string
}
export interface IformLayout extends IFormItemLayout {
  type: string
  col?: number
}
export default class FormPresenter extends FormLifecycle {
  @observable
  private HOCFormComponent: any

  private form: IFormProps['form']

  private formItems: IFormItem[]

  private initFormValues: any

  private rest

  private formLayout: IformLayout = {
    type: formLayoutEnums.FLOW, // 默认流式布局
  }

  constructor(options: IFormPresenterProps) {
    super()
    const {
      formItems,
      initFormValues,
      onFormCreated,
      onFormDestroy,
      onFormMount,
      formLayout,
      ...rest
    } = options

    this.formItems = formItems?.slice(0) // 复制一份避免formItems被修改后产生bug

    this.initFormValues = initFormValues

    this.rest = rest

    if (formLayout) {
      this.formLayout = formLayout
    }
    /* onFormCreated */
    if (onFormCreated) {
      this.listener.formCreatedListener.push(onFormCreated)
    }
    /* onFormMount */
    if (onFormMount) {
      this.listener.formMountListener.push(onFormMount)
    }
    /* onFormDestroy */
    if (onFormDestroy) {
      this.listener.formDestroyListener.push(onFormDestroy)
    }
    if (initFormValues) {
      this.initForm(this.formItems, initFormValues, rest)
    }
  }

  private initForm = (formItems: IFormItem[], initFormValues: any, rest?: any): void => {
    const { onFieldsChange, onValuesChange } = rest
    let formCreated = false
    this.HOCFormComponent = Form.create({ onFieldsChange, onValuesChange })(
      ({ form, ...props }: any) => {
        this.form = form
        // rewrite validateFields method
        this.__validateFieldsAndScroll(form)
        this.__validateFields(form)
        this.__getFieldsValue(form)
        form.getFieldDecorator(FORM_TITEMS, {
          initialValue: formItems,
          getValueFromEvent: () => undefined,
        })
        if (!formCreated) {
          formCreated = true
          // trigger lifeCycle listener
          this.triggerListener('formCreatedListener', form)
        }
        return (
          <FromCreator
            triggerListener={this.triggerListener}
            form={form}
            formLayout={this.formLayout}
            initFormValues={initFormValues}
            {...rest}
            {...props}
          />
        )
      },
    )
  }

  public setInitFormValues = (initFormValues: any) => {
    this.initFormValues = initFormValues
    // this.initForm(this.formItems, initFormValues, this.rest)
  }

  /**
   * @description: 返回FormComponent组件
   * @param {type}
   * @return:
   */

  public getFormComponent = (): Function => {
    if (this.HOCFormComponent) {
      return this.HOCFormComponent
    }
    return () => <div />
  }
  /**
   * @description: 返回form实例
   * @param {type}
   * @return:
   */

  public getForm = (): IFormProps['form'] => {
    return this.form
  }
  /**
     * @description: 返回formItems
     * @param {type}
     * @return:
     */

  public getFormItems = (): IFormItem[] => {
    return this.form.getFieldValue(FORM_TITEMS)
  }
  /**
     * @description: 返回formItem的下标
     * @param {type}
     * @return: index
     */

  public getFormItemIndex = (key: string): number => {
    return this.form.getFieldValue(FORM_TITEMS)?.findIndex(i => i.key === key)
  }
  /**
   * @description: 增加form item
   * @param {type}
   * @return:
   */
  public addFormItem = (formItem: IFormItem, index?: number) => {
    if (this.form) {
      if (!formItem) return
      const { key } = formItem
      const formItems = this.form.getFieldValue(FORM_TITEMS)
      if (!formItems.find(((i: { key: string | number }) => i.key === key))) {
        if (typeof index === 'undefined') {
          formItems.push(formItem)
        } else {
          formItems.splice(index, 0, formItem)
        }
        this.form.setFieldsValue({
          [FORM_TITEMS]: formItems,
        })
      } else {
        console.warn(`Form field ${key} has already been created!`)
      }
    } else {
      console.warn('Form field cannot be set before form created!')
    }
  }
  /**
   * @description: remove form item
   * @param {type}
   * @return:
   */
  public removeFormItem = (key: string) => {
    if (this.form) {
      const formItems = this.form.getFieldValue(FORM_TITEMS)
      const index = formItems.findIndex(i => i.key === key)
      if (index !== -1) {
        formItems.splice(index, 1)
        this.form.setFieldsValue({
          [FORM_TITEMS]: formItems,
        })
      }
    } else {
      console.warn('Form field cannot be set before form created!')
    }
  }
  public addFormList = (formItemList: any[]) => {
    if (this.form) {
      if (!formItemList) return
      let formItems = this.form.getFieldValue(FORM_TITEMS)
      formItems = formItems.concat(formItemList)
      this.form.setFieldsValue({
        [FORM_TITEMS]: formItems,
      })
    } else {
      console.warn('Form field cannot be set before form created!')
    }
  }
  public replaceFormList = (formItemList: any[], formValues) => {
    if (this.form) {
      if (!formItemList) return
      this.initFormValues = formValues
      this.initForm(formItemList, formValues, this.rest)
    } else {
      console.warn('Form field cannot be set before form created!')
    }
  }
  /**
  * @description: 更新form item
  * @param {type}
  * @return:
  */
  public updateFormItem = (formItem: IFormItem) => {
    if (this.form) {
      const formItems = this.form.getFieldValue(FORM_TITEMS)
      const index = formItems.findIndex(i => i.key === formItem.key)
      formItems.splice(index, 1, formItem)
      this.form.setFieldsValue({
        [FORM_TITEMS]: formItems,
      })
    } else {
      console.warn('Form field cannot be set before form created!')
    }
  }
  /**
   * @description: 判断form是否已有某字段
   * @param {type}
   * @return {type}
   */

  public hasField = (key: string) => {
    const formItems = this.form.getFieldValue(FORM_TITEMS)
    if (!formItems.find((i: { key: string | number }) => i.key === key)) {
      return false
    }
    return true
  }
  /**
   * @description: 把form重置回初始值的状态
   * @param {type}
   * @return {type}
   */
  public resetFields = () => {
    console.log(this.initFormValues, 'initFormValues')
    this.form.setFieldsValue(this.initFormValues)
  }
}
