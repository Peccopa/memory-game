import BaseComponent from '../../base/BaseComponent';

export default class LabelComponent extends BaseComponent {
  constructor({ htmlFor, ...rest } = {}) {
    super({ tag: 'label', ...rest });

    if (htmlFor !== undefined) {
      this.setFor(htmlFor);
    }
  }

  get label() {
    if (this.element instanceof HTMLLabelElement) return this.element;
    throw new TypeError('Element is not a label');
  }

  setFor(id) {
    this.label.htmlFor = id;
    return this;
  }
}
