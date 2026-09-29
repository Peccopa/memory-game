import BaseComponent from '../../base/BaseComponent';

export default class FormComponent extends BaseComponent {
  constructor({ method = 'get', action, autocomplete, ...rest } = {}) {
    super({
      tag: 'form',
      ...rest,
    });

    if (method) this.setMethod(method);
    if (action) this.setAction(action);
    if (autocomplete !== undefined) this.setAutocomplete(autocomplete);
  }

  get form() {
    if (!(this.element instanceof HTMLFormElement)) {
      throw new TypeError('Element is not a form');
    }
    return this.element;
  }

  setAction(action) {
    this.form.action = action;
    return this;
  }

  setMethod(method) {
    this.form.method = method;
    return this;
  }

  submit() {
    this.form.submit();
  }

  reset() {
    this.form.reset();
  }

  getFormData() {
    return new FormData(this.form);
  }

  setAutocomplete(autocomplete) {
    this.form.autocomplete = autocomplete;
    return this;
  }
}
