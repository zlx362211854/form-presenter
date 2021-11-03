import {EntityFormLifecycle} from './FormPresenter'
import {FormMethodOverwrite} from './FormMethodOverwrite'

export class FormLifecycle extends FormMethodOverwrite {
  private formCreatedListener: Array<EntityFormLifecycle['onFormCreated']> = []
  private formMountListener: Array<EntityFormLifecycle['onFormMount']> = []
  private formDestroyListener: Array<EntityFormLifecycle['onFormDestroy']> = []
  protected listener = {
    formCreatedListener: this.formCreatedListener,
    formMountListener: this.formMountListener,
    formDestroyListener: this.formDestroyListener,
  }
  protected triggerListener = (type, params) => {
    const listener = this.listener[type]
    if (listener.length > 0) {
      listener.forEach((l) => {
        l(params)
      })
    }
  }
}
