import BaseComponent from '../../base/BaseComponent';

export default class InputComponent extends BaseComponent {
  constructor({
    type = 'text',
    name,
    placeholder,
    value,
    autocomplete,
    ...rest
  } = {}) {
    super({
      tag: 'input',
      ...rest,
    });

    this.setType(type);

    if (name !== undefined) this.setName(name);
    if (placeholder !== undefined) this.setPlaceholder(placeholder);
    if (value !== undefined) this.setValue(value);
    if (autocomplete !== undefined) this.setAutocomplete(autocomplete);
  }

  get input() {
    if (!(this.element instanceof HTMLInputElement)) {
      throw new TypeError('Element is not an input');
    }
    return this.element;
  }

  get value() {
    return this.input.value;
  }

  get length() {
    return this.value.length;
  }

  setValue(value = '') {
    this.input.value = value;
    return this;
  }

  setName(name) {
    this.input.name = name;
    return this;
  }

  setType(type) {
    this.input.type = type;
    return this;
  }

  setPlaceholder(placeholder) {
    this.input.placeholder = placeholder;
    return this;
  }

  setDisabled(disabled) {
    this.input.disabled = disabled;
    return this;
  }

  setRequired(required) {
    this.input.required = required;
    return this;
  }

  setAutocomplete(autocomplete) {
    this.input.autocomplete = autocomplete;
    return this;
  }

  isLengthBetween(min, max) {
    return this.length >= min && this.length <= max;
  }

  isValidByRegex(pattern) {
    return pattern.test(this.value);
  }

  isValid() {
    return this.input.checkValidity();
  }

  isEmpty() {
    return this.length === 0;
  }

  clear() {
    this.input.value = '';
    return this;
  }
}
