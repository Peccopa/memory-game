import BaseComponent from '../../base/BaseComponent';

export default class ButtonComponent extends BaseComponent {
  constructor({ type = 'button', disabled, name, value, ...rest } = {}) {
    super({
      tag: 'button',
      content: 'Button',
      ...rest,
    });

    this.setType(type);

    if (disabled !== undefined) this.setDisabled(disabled);
    if (name !== undefined) this.setName(name);
    if (value !== undefined) this.setValue(value);
  }

  get button() {
    if (!(this.element instanceof HTMLButtonElement)) {
      throw new TypeError('Element is not an button');
    }
    return this.element;
  }

  setType(type) {
    this.button.type = type;
    return this;
  }

  setDisabled(disabled) {
    this.button.disabled = disabled;
    return this;
  }

  setName(name) {
    this.button.name = name;
    return this;
  }

  setValue(value) {
    this.button.value = value;
    return this;
  }
}
