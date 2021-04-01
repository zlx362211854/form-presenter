import React from 'react'
import {Input, Button} from 'antd'
import {CloseCircleOutlined} from '@ant-design/icons'
import FormPresenter from '../src/FormPresenter'
export interface IProps {
  presenter: FormPresenter
}
export default class Reason extends React.Component<IProps> {
  state = {
    values: [],
  }
  componentDidMount() {
    const form = this.props.presenter.getForm()
    const reasons = form.getFieldValue('refundReason')
    this.setState({
      values: reasons || [],
    })
  }

  private add = () => {
    const values = this.state.values.slice(0)
    values.push({
      id: '',
      action: "CREATE",
      refundReason: '',
    })
    this.setState({values})

  }
  private deleteValue = (index: number) => () => {
    const values = this.state.values.slice(0)
    values.splice(index, 1)
    this.setState({values})
  }
  
  render() {
    const {values = []} = this.state
    return (
      <div>
        {values.map((val, index) => {
          return (
            <Input
              maxLength={20}
              key={index}
              addonAfter={<CloseCircleOutlined  onClick={this.deleteValue(index)} />}
            />
          )
        })}
        <Button onClick={this.add} type="primary">
          添加
        </Button>
      </div>
    )
  }
}
