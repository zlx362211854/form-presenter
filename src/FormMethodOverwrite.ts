import _ from 'lodash'
import {FORM_ITEMS} from './enums'
import { formatValues } from './FormCreator'
import { IRewriteForm } from './FormPresenter'
export class FormMethodOverwrite {
  private overwritedForm: IRewriteForm
  private originForm: IRewriteForm
  constructor(form) {
    this.originForm = form
    let overwritedForm = _.cloneDeep(form)
    this.validateFieldsAndScroll(overwritedForm)
    this.validateFields(overwritedForm)
    this.getFieldsValue(overwritedForm)
    this.getFieldValue(overwritedForm)
    this.setFieldsValue(overwritedForm)
    this.overwritedForm = overwritedForm
  }
  private validateFieldsAndScroll = (form) => {
    const _validateFields = form.validateFields
    form.validateFieldsAndScroll = (cb) => {
      _validateFields().then(values => {
        const vals = formatValues(values)
        cb(null, vals)
      }).catch(err => {
        cb(err, {})
      })
    }
  }
  private validateFields = (form) => {
    const _validateFields = form.validateFields
    form.validateFields = (cb) => {
      _validateFields([FORM_ITEMS]).then(values => {
        cb(null, formatValues(values))
      }).catch(err => {
        cb(err, {})
      })
    }
  }
  private getFieldValue = (form) => {
    const __getFieldValue = form.getFieldValue
    form.getFieldValue = (key) => {
      const values = __getFieldValue([FORM_ITEMS])
      return values?.find(i => i.key === key)?.[key]
    }
  }
  private getFieldsValue = (form) => {
    const __getFieldsValue = form.getFieldsValue
    form.getFieldsValue = (cb) => {
      const values = __getFieldsValue()
      return formatValues(values)
    }
  }
  private setFieldsValue = (form) => {
    const __setFieldsValue = form.setFieldsValue
    form.setFieldsValue = (params) => {
      const values = this.originForm.getFieldsValue()?.[FORM_ITEMS]
      Object.keys(params).forEach(k => {
        values.find(i => i.key === k)[k] = params[k]
      })
      __setFieldsValue({
        [FORM_ITEMS]: values
      })
    }
  }
  public getForm = (): IRewriteForm => {
    return this.overwritedForm
  }
}
