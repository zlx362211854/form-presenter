import React from 'react'
import {Button} from 'antd'
import FormPresenter from '../src/FormPresenter'
import  {IFormItem} from '../src/declare'
export const info: IFormItem[] = [
  {
    label: '姓名',
    key: 'name',
    uiType: 'input',
    rules: [
      {
        required: true,
        message: '请输入姓名',
      },
    ],
  },
  {
    label: '年龄',
    key: 'age',
    uiType: 'input',
    rules: [
      {
        required: true,
        message: '请输入年龄',
      },
    ],
  },
  {
    label: '金额',
    key: 'money',
    uiType: 'currencyInput',
    suffix: '¥',
  },

  {
    label: '日期',
    key: 'date',
    uiType: 'datePicker',
    showTime: true,
    format: 'YYYY-MM-DD HH:mm:ss',
    rules: [
      {
        required: true,
        message: '',
      },
    ],
  },
  {
    label: '日期1',
    key: 'date1',
    uiType: 'dateRangePicker',
    showTime: true,
    format: 'YYYY-MM-DD HH:mm:ss',
    rules: [
      {
        required: true,
        message: '',
      },
    ],
  },
  {
    label: '日期2',
    key: 'date2',
    uiType: 'monthPicker',
    rules: [
      {
        required: true,
        message: '',
      },
    ],
  },
  {
    label: '日期3',
    key: 'date3',
    uiType: 'timePicker',
    format: 'HH:mm',
    rules: [
      {
        required: true,
        message: '',
      },
    ],
  },
  {
    label: '提现手续费',
    key: 'poundage',
    uiType: 'picturesWall',
    rules: [
      {
        required: true,
        message: '',
      },
    ],
    uploadProps: {
      // action: '/services/upload/tenant/NULL/copyrightIcon',
      maxFileLength: 2,
      fileTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
      fileSize: 2,
    },
  },
]
export default class Test extends React.Component {
  private presenter: FormPresenter<any>
  constructor(props) {
    super(props)
    this.presenter = new FormPresenter({
      formItems: info,
      initFormValues: {},
      formLayout: {
        type: 'flow',
        col: 8,
      },
      disableSubmitButton: true,
      onValuesChange: ({form}, changedvalues, allValues) => {
        // reaction
        if (changedvalues && changedvalues.name) {
          if (changedvalues.name === '杨超越') {
            form.setFieldsValue({
              age: 18,
            })
            // form.setFields({
            //   balance: {
            //     value: 456,
            //     errors: [new Error('金额不能大于余额')],
            //   },
            // })
          }
        }
      },
      onFormCreated: () => {
        console.log('onFormCreated-----')
      },
      onFormMount: () => {
        console.log('onFormMount-----')
      },
      onFormDestroy: () => {
        console.log('onFormDestroy-----')
        // do some things when form destroy
      },
    })
    this.state = {}
  }
  add = () => {
    this.presenter.addFormItem({
      label: '描述',
      key: 'desc',
      uiType: uiTypeEnums.CUSTOM, // 添加类型为自定义组件（也可以添加内置组件）
      rules: [
        {
          required: false,
          message: '',
        },
      ],
      render: this.renderDom,
    })
  }

  renderDom = React.forwardRef((props, ref) => {
    return <span ref={ref}>这是添加的自定义组件</span>
  })
  submit = () => {
    const form = this.presenter.getForm()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values, 'vvvvv')
      }
    })
  }
  render() {
    const FormComponent = this.presenter.getFormComponent()
    const formComponentProps = {
      initFormValues: {
        // balance: 12234.888,
        // poundage: [
        //   'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //   'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // ],
        // money: 2345.667,
        name: 'zlx',
      },
    }
    return (
      <div title={'测试'} style={{width: '80%', margin: 'auto'}}>
        <FormComponent {...formComponentProps} />
        <Button onClick={() => this.add()}>添加</Button>
        <Button onClick={() => this.submit()}>提交</Button>
      </div>
    )
  }
}
