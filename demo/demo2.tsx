import React from 'react'
import {Button} from 'antd'
import FormPresenter from '../src/FormPresenter'
import {IFormItem} from '../src/declare'
import Reason from './reason'
export const info: IFormItem[] = [
  {
    uiType: 'title',
    label: '退货信息',
    extra:
      '注： 填写退货信息！',
  },
  {
    label: '退货人',
    key: 'name',
    uiType: 'input',
    extra: '退货人姓名',
    rules: [
      {
        required: true,
        message: '请填写退货人姓名',
      }
    ]
  },
  {
    label: '商品金额',
    key: 'amount',
    uiType: 'input',
    extra: '退货金额提交了不可更改，请谨慎提交',
    rules: [
      {
        pattern: /(^[1-9][0-9]*(\.[0-9]{1,2})?$|^0*(\.[0-9]{1,2})?$)/,
        message: '请输入数字(小数点后最多两位)',
      },
    ],
    suffix: '元',
  },
  {
    label: '退款金额',
    key: 'refundAmount',
    uiType: 'info',
    prefix: '¥',
    rules: [
      {
        required: true,
        message: '',
      },
    ],
    style: {
      color: '#FF5300',
    },
    extra: (value) => {
      if (value) return `不可修改，最多¥${value}`
    },
  },
  {
    uiType: 'title',
    label: '设置退款原因',
    extra: '最多十个',
  },
]
export default class Demo2 extends React.Component {
  private presenter: FormPresenter
  constructor (props) {
    super(props)
    this.presenter = new FormPresenter({
      formItems: info,
      disableSubmitButton: true,
      initFormValues: {},
      formLayout: {
        type: 'flow',
        // col: 8,
        labelCol: {
          span: 2,
        },
        wrapperCol: {
          span: 8,
        },
      },
      wrapperClassName: 'refund-form',
      onValuesChange: ({form}, changedvalues, allValues) => {
        // reaction
        if (changedvalues && changedvalues.amount) {
          form.setFieldsValue({
            refundAmount: changedvalues.amount,
          })
        }
      },
    })
    this.state = {}
  }
  componentDidMount() {
    if (!this.presenter.hasField('refundReason')) {
      this.presenter.addFormItem({
        label: '退款原因',
        key: 'refundReason',
        uiType: 'custom', // 添加类型为自定义组件（也可以添加内置组件）
        rules: [
          {
            required: true,
            message: '请填写退款原因',
          },
        ],
        render: React.forwardRef((props, ref) => {
          return <Reason ref={ref} presenter={this.presenter}></Reason>
        }),
      })
    }
  }
  render() {
    const FormComponent = this.presenter.getFormComponent()
    let initFormValues: any = {}
    const formProps = {
      initFormValues
    }
    return (
      <div title={'测试'} style={{width: '80%', margin: 'auto'}}>
        <FormComponent {...formProps} />
      </div>
    )
  }
}
