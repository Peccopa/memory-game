export default class ContentManager {
  element;

  constructor(element) {
    this.element = element;
  }

  set(content) {
    if (!this.element) return this;

    this.clear();
    this.element.textContent = String(content);

    return this;
  }

  clear() {
    if (!this.element) return this;

    while (this.element.firstChild) {
      this.element.firstChild.remove();
    }

    return this;
  }
}
