export default class StyleManager {
  element;

  constructor(element) {
    this.element = element;
  }

  set(styles) {
    if (!(this.element instanceof HTMLElement)) return this;

    for (const key in styles) {
      const value = styles[key];
      if (value !== undefined && value !== null) {
        this.element.style[key] = value;
      }
    }
    return this;
  }

  remove(...keys) {
    if (!(this.element instanceof HTMLElement)) return this;

    for (const key of keys) {
      const kebabKey = key.replaceAll(/[A-Z]/g, (m) => '-' + m.toLowerCase());
      this.element?.style.removeProperty(kebabKey);
    }

    return this;
  }
}
