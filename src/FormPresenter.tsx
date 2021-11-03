import { FormProps } from 'antd';
import React from 'react';
import { IFormItem, IformLayout } from './declare';
import { formLayoutEnums, FORM_ITEMS } from './enums';
import FormCreator from './FormCreator';
import _ from 'lodash';
export interface IFormPresenterOptions {
  formItems: IFormItem[];
  initFormValues?: any;
  formLayout?: IformLayout;
  wrapperClassName?: string;
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

export type IRewriteForm = {
  validateFields: (any) => void;
  validateFieldsAndScroll: (any) => void;
} & FormProps['form'];

export default class FormPresenter {
  private options: IFormPresenterOptions;
  private formCompRef: any = React.createRef();
  private HOCFormComponent: any;
  private defaultFormLayout: IFormPresenterOptions['formLayout'] = {
    type: formLayoutEnums.FLOW, // 默认流式布局
  };

  constructor(options: IFormPresenterOptions) {
    if (!options.initFormValues) options.initFormValues = {};
    this.options = options;
    this.initForm();
  }
  public setInitFormValues = (initFormValues: any) => {
    this.options.initFormValues = initFormValues
  }
  private initForm = () => {
    this.HOCFormComponent = (componentProps) => {
      const initFormValues = this.options.initFormValues;
      Object.keys(initFormValues)?.forEach((key) => {
        this.options.formItems.find((i) => i.key === key)[key] = initFormValues[key];
      });
      return (
        <FormCreator
          ref={this.formCompRef}
          formItems={this.options.formItems}
          initFormValues={{
            [FORM_ITEMS]: this.options.formItems || [],
          }}
          componentProps={componentProps || {}}
          onSubmit={this.options.onSubmit}
          onSubmitFailed={this.options.onSubmitFailed}
          disableSubmitButton={this.options.disableSubmitButton}
          formLayout={this.options.formLayout || this.defaultFormLayout}
          onFieldsChange={this.options.onFieldsChange}
          onValuesChange={this.options.onValuesChange}
          // life cycle
          onFormCreated={this.options.onFormCreated}
          onFormMount={this.options.onFormMount}
          onFormDestroy={this.options.onFormDestroy}
        />
      );
    };
  };

  /**
   * @description: 返回FormComponent组件
   * @param {type}
   * @return:
   */

  public getFormComponent = (): Function => {
    if (this.HOCFormComponent) {
      return this.HOCFormComponent;
    }
    return () => <div />;
  };
  /**
   * @description: 返回formItems
   * @param {type}
   * @return:
   */

  public getFormItems = (): IFormItem[] => {
    return this.options.formItems;
  };

  /**
       * @description: 返回formItem的下标
       * @param {type}
       * @return: index
       */
  public getFormItemIndex = (key: string): number => {
    return this.options.formItems?.findIndex(i => i.key === key)
  }
  /**
   * @description: 返回form实例
   * @param {type}
   * @return:
   */

  public getForm = (): IRewriteForm => {
    return this.formCompRef?.current.getForm();
  };
  /**
   * @description: 增加form item
   * @param {type}
   * @return:
   */
  public addFormItem = (formItem: IFormItem, index?: number) => {
    const form = this.getForm();
    if (form) {
      if (!formItem) return;
      const { key } = formItem;
      const formItems = this.options.formItems;
      if (!formItems.find((i) => i.key === key)) {
        if (typeof index === 'undefined') {
          formItems.push(formItem);
        } else {
          formItems.splice(index, 0, formItem);
        }
        form.setFieldsValue({
          ...form.getFieldsValue(),
        });
      } else {
        console.warn(`Form field ${key} has already been created!`);
      }
    } else {
      console.warn('Form field cannot be set before form created!');
    }
  };
  /**
    * @description: remove form item
    * @param {type}
    * @return:
    */
  public removeFormItem = (key: string) => {
    const form = this.getForm();
    if (form) {
      const formItems = this.options.formItems;
      const index = formItems.findIndex(i => i.key === key)
      if (index !== -1) {
        formItems.splice(index, 1)
        form.setFieldsValue({
          ...form.getFieldsValue(),
        });
      }
    } else {
      console.warn('Form field cannot be set before form created!')
    }
  }
  /**
    * @description: add form list 
    * @param {type}
    * @return:
    */
  public addFormList = (formItemList: any[]) => {
    const form = this.getForm();
    if (form) {
      if (!formItemList) return
      let formItems = this.options.formItems;
      this.options.formItems = formItems.concat(formItemList)
      form.setFieldsValue({
        ...form.getFieldsValue(),
      });
    } else {
      console.warn('Form field cannot be set before form created!')
    }
  }

  public replaceFormList = (formItemList: any[], formValues) => {
    const form = this.getForm();
    if (form) {
      if (!formItemList) return
      this.options.initFormValues = formValues
      this.options.formItems = formItemList
      form.setFieldsValue({
        ...form.getFieldsValue(),
      });
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
    const form = this.getForm();
    if (form) {
      const formItems = this.options.formItems;
      const index = formItems.findIndex((i) => i.key === formItem.key);
      formItems.splice(index, 1, formItem);
      form.setFieldsValue({
        ...form.getFieldsValue(),
      });
    } else {
      console.warn('Form field cannot be set before form created!');
    }
  };
  /**
   * @description: 判断form是否已有某字段
   * @param {type}
   * @return {type}
   */

  public hasField = (key: string) => {
    const formItems = this.options.formItems;
    if (!formItems.find((i) => i.key === key)) {
      return false;
    }
    return true;
  };

  /**
   * @description: 把form重置回初始值的状态
   * @param {type}
   * @return {type}
   */
  public resetFields = () => {
    const form = this.getForm();
    if (Object.keys(this.options.initFormValues).length === 0) {
      form.resetFields([FORM_ITEMS]);
    } else {
      form?.setFieldsValue(this.options.initFormValues);
    }
  };
}
