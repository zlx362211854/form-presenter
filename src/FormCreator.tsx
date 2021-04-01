import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import { Form, Divider, Row, Col, Button } from 'antd';
import { IFormItem } from './declare';
import { formLayoutEnums, FORM_ITEMS, uiTypeEnums } from './enums';
import { UIFunctionMap, UIKeyMap } from './render';
import { IFormPresenterOptions } from './FormPresenter';
import { FormMethodOverwrite } from './FormMethodOverwrite';
const defaultFormItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
interface IProps extends IFormPresenterOptions {
  componentProps: any // 渲染时来自组件的props
}
export const formatValues = (values) => {
  const fields = values[FORM_ITEMS].map(i => i.key)
  const vals = {}
  fields.forEach(i => {
    const v = values[FORM_ITEMS].find(l => l.key === i)[i]
    if (v) {
      vals[i] = v
    }
  })
  return vals
}
const FormCreator = forwardRef((props: IProps, ref) => {
  let [form] = Form.useForm();
  const overwritedForm = new FormMethodOverwrite(form)?.getForm();

  useEffect(() => {
    props?.onFormMount?.();
    return () => {
      props?.onFormDestroy?.();
    };
  }, []);

  useEffect(() => {
    props?.onFormCreated?.(overwritedForm);
    // 设置表单初始化值
    // if (props.componentProps.initFormValues && Object.keys(props.componentProps.initFormValues).length !== 0) {
    //   overwritedForm.setFieldsValue(props.componentProps.initFormValues)
    // }
  }, [overwritedForm]);

  const onFinish = (values) => {
    const vals = formatValues(values)
    console.log('Form返回的值为：', vals);
    props?.onSubmit?.(vals);
  };

  const onFinishFailed = ({ values, errorFields }) => {
    props?.onSubmitFailed?.(errorFields, overwritedForm);
  };

  const renderFields = (fields, { add, remove }) => {
    const { formLayout, initFormValues, formItems } = props;
    if (formLayout.type === formLayoutEnums.FLOW) {
      return (
        <>
          {fields?.map((field, index) => {
            const formItem = formItems[field.fieldKey]
            let itemLayout;
            let extra;
            if (formItem.divider) {
              return <Divider key={index} style={{ background: '#EBEBEB' }} />;
            }
            // 可以自定义布局比例
            if (formLayout.labelCol && formLayout.wrapperCol) {
              itemLayout = {
                labelCol: formLayout.labelCol,
                wrapperCol: formLayout.wrapperCol,
              };
            } else {
              itemLayout = defaultFormItemLayout;
            }
            if (typeof formItem.extra === 'string') {
              extra = formItem.extra;
            } else if (typeof formItem.extra === 'function') {
              const fieldInitValue =
                initFormValues[formItem.key] || form.getFieldValue(formItem.key);
              extra = formItem.extra(fieldInitValue);
            }
            if (formItem.uiType === uiTypeEnums.TITLE) {
              const Label = (props) => {
                return (
                  <span style={{ margin: '0', padding: '0 20px', fontSize: '18px', color: '#000' }}>
                    {props.label}
                  </span>
                );
              };
              return (
                <Form.Item
                  {...itemLayout}
                  colon={false}
                  name={[field.name, formItem.key]}
                  label={<Label label={formItem.label} />}
                  key={formItem.label}
                >
                  <span style={{ color: '#878787' }}>{formItem.extra}</span>
                </Form.Item>
              );
            }
            return (
              <Form.Item
                {...itemLayout}
                key={index}
                label={formItem.label}
                name={[field.name, formItem.key]}
                rules={formItem.rules}
                extra={extra}
              >
                {renderField(formItem)}
              </Form.Item>
            );
          })}
        </>
      );
    }
    return (
      <Row gutter={24}>
        {fields.map((field, index) => {
          // 可以自定义布局比例
          const formItem = formItems[field.fieldKey]
          let itemLayout;
          if (formLayout.labelCol && formLayout.wrapperCol) {
            itemLayout = {
              labelCol: formLayout.labelCol,
              wrapperCol: formLayout.wrapperCol,
            };
          } else {
            itemLayout = defaultFormItemLayout;
          }
          return (
            <Col span={formLayout.col} key={formItem.key}>
              <Form.Item
                {...itemLayout}
                key={index}
                label={formItem.label}
                name={[field.name, formItem.key]}
                rules={formItem.rules}
                extra={formItem.extra}
              >
                {renderField(formItem)}
              </Form.Item>
            </Col>
          );
        })}
      </Row>
    );
  };
  const renderField = (formItem: IFormItem): React.ReactNode | string => {
    const { initFormValues, formLayout } = props;
    let fieldInitValue = initFormValues[formItem.key];
    const keyString = formItem.key;
    let _fieldInitValue = keyString.split('.').reduce((pr, cuur, inde, arr) => {
      return pr[cuur];
    }, initFormValues);
    if (!fieldInitValue && _fieldInitValue) {
      fieldInitValue = _fieldInitValue;
    }
    let uiKey;
    const UIKeyMapArray = Object.keys(UIKeyMap);
    for (let i = 0; i < UIKeyMapArray.length; i++) {
      if (UIKeyMap[UIKeyMapArray[i]].find((k) => k === formItem.uiType)) {
        uiKey = UIKeyMapArray[i];
        break;
      }
    }
    if (uiKey) {
      return UIFunctionMap.get(UIKeyMap[uiKey])(
        overwritedForm,
        formItem,
        fieldInitValue,
        formLayout,
        initFormValues
      );
    } else {
      return '不存在的formField UI类型:' + formItem.uiType;
    }
  };

  /* public methods */
  useImperativeHandle(ref, () => ({
    getForm: () => {
      return overwritedForm;
    },
  }));
  return (
    <Form
      form={form}
      initialValues={props.initFormValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onFieldsChange={(changedValues, allValues) => {
        let vals = {}
        changedValues[FORM_ITEMS]?.filter(i => !!i).forEach(l => {
          vals = Object.assign({}, l)
        })
        props.onFieldsChange?.(
          { form: overwritedForm },
          vals,
          formatValues(allValues)
        );
      }}
      onValuesChange={(changedValues, allValues) => {
        let vals = {}
        changedValues[FORM_ITEMS]?.filter(i => !!i).forEach(l => {
          vals = Object.assign({}, l)
        })
        props?.onValuesChange?.(
          { form: overwritedForm },
          vals,
          formatValues(allValues)
        );
      }}
    >
      <Form.List name={FORM_ITEMS} children={renderFields}></Form.List>
      {!props.disableSubmitButton && (
        <Form.Item wrapperCol={{ span: 24, offset: 12 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      )}
    </Form>
  );
});

export default FormCreator;
