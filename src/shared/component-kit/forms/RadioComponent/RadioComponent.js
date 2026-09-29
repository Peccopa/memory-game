import InputComponent from '../InputComponent/InputComponent';

export default class RadioComponent extends InputComponent {
  constructor({ checked, value, ...properties } = {}) {
    super({ type: 'radio', ...properties });

    if (checked !== undefined) this.setChecked(checked);
    if (value !== undefined) this.setValue(value);
  }

  isChecked() {
    return this.input.checked;
  }

  setChecked(state) {
    this.input.checked = state;
    return this;
  }
}
