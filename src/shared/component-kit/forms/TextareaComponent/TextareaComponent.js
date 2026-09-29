import BaseComponent from '../../base/BaseComponent';

export default class TextareaComponent extends BaseComponent {
  constructor({ value, placeholder, autocomplete, rows, cols, ...rest } = {}) {
    super({
      tag: 'textarea',
      ...rest,
    });

    if (value !== undefined) this.setValue(value);
    if (placeholder !== undefined) this.setPlaceholder(placeholder);
    if (rows !== undefined) this.setRows(rows);
    if (cols !== undefined) this.setCols(cols);
    if (autocomplete !== undefined) this.setAutocomplete(autocomplete);
  }

  get textarea() {
    if (this.element instanceof HTMLTextAreaElement) {
      return this.element;
    }
    throw new TypeError('Element is not a textarea');
  }

  getValue() {
    return this.textarea.value;
  }

  setValue(value) {
    this.textarea.value = value;
    return this;
  }

  setPlaceholder(placeholder) {
    this.textarea.placeholder = placeholder;
    return this;
  }

  setRows(rows) {
    this.textarea.rows = rows;
    return this;
  }

  setCols(cols) {
    this.textarea.cols = cols;
    return this;
  }

  clear() {
    this.textarea.value = '';
    return this;
  }

  setRequired(required) {
    this.textarea.required = required;
    return this;
  }

  setAutocomplete(autocomplete) {
    this.textarea.autocomplete = autocomplete;
    return this;
  }
}
