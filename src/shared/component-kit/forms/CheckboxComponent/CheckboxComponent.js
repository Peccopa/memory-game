import InputComponent from '../InputComponent/InputComponent';

export default class CheckboxComponent extends InputComponent {
  constructor({ checked, ...rest } = {}) {
    super({ type: 'checkbox', ...rest });

    if (checked !== undefined) this.setChecked(checked);
  }

  isChecked() {
    return this.input.checked;
  }

  setChecked(state) {
    this.input.checked = state;
    return this;
  }

  toggle() {
    this.input.checked = !this.input.checked;
    return this;
  }
}
