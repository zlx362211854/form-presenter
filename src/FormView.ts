import FormPresenter, { IFormPresenterProps } from "./FormPresenter";

export default class FormView extends FormPresenter {
  constructor(options: IFormPresenterProps) {
    options.formItems = options.formItems.map(i => ({...i, disabled: true}))
    super(options)
  }
}