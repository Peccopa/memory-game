export default class ElementManager {
  element = null;
  namespace = 'html';

  constructor(tag = 'div', namespace) {
    if (this.element) return this;

    if (namespace) this.namespace = namespace;
    this.createElement(tag);
  }

  createElement(tag) {
    this.element =
      this.namespace === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', tag)
        : document.createElement(tag);
  }

  get domElement() {
    if (!this.element) throw new Error('Element not created');
    return this.element;
  }

  setElement(element) {
    this.element = element;
    return this;
  }
}
