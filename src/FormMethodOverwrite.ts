import _ from 'lodash'
import {FORM_TITEMS} from './enums'
export class FormMethodOverwrite {
  protected __validateFieldsAndScroll = (form) => {
    const _validateFieldsAndScroll = form.validateFieldsAndScroll
    form.validateFieldsAndScroll = (cb) => {
      _validateFieldsAndScroll((err, values) => {
        const returnValues = _.cloneDeep(values)
        delete returnValues[FORM_TITEMS]
        cb(err, returnValues)
      })
    }
  }
  protected __validateFields = (form) => {
    const _validateFields = form.validateFields
    form.validateFields = (cb) => {
      _validateFields((err, values) => {
        const returnValues = _.cloneDeep(values)
        delete returnValues[FORM_TITEMS]
        cb(err, returnValues)
      })
    }
  }
}
