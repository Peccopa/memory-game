import BaseComponent from '../../base/BaseComponent';

export default class SelectComponent extends BaseComponent {
  constructor({
    value,
    options,
    autocomplete,
    multiple = false,
    ...rest
  } = {}) {
    super({ tag: 'select', ...rest });

    this.setMultiple(multiple);

    if (options) this.setOptions(options);
    if (value !== undefined) this.setValue(value);
    if (autocomplete !== undefined) this.setAutocomplete(autocomplete);
  }

  get select() {
    if (this.element instanceof HTMLSelectElement) return this.element;
    throw new TypeError('Element is not a select');
  }

  setOptions(options) {
    this.clearOptions();
    for (const opt of options)
      this.addOption(opt.value, opt.label, !!opt.selected);
    return this;
  }

  addOption(value, label, selected = false) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    option.selected = selected;
    this.select.append(option);
    return this;
  }

  removeOption(value) {
    const option = [...this.select.options].find((o) => o.value === value);
    if (option) option.remove();
    return this;
  }

  clearOptions() {
    while (this.select.firstChild) {
      this.select.firstChild.remove();
    }
    return this;
  }

  getValue() {
    if (this.select.multiple) {
      return [...this.select.selectedOptions].map((o) => o.value);
    }
    return this.select.value;
  }

  setValue(value) {
    if (this.select.multiple && Array.isArray(value)) {
      for (const o of this.select.options) {
        o.selected = value.includes(o.value);
      }
    } else if (!this.select.multiple && typeof value === 'string') {
      this.select.value = value;
    }
    return this;
  }

  isMultiple() {
    return this.select.multiple;
  }

  setMultiple(multiple) {
    this.select.multiple = multiple;
    return this;
  }

  setAutocomplete(autocomplete) {
    this.select.autocomplete = autocomplete;
    return this;
  }
}
