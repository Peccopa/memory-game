export default class AttributeManager {
  element;

  constructor(element) {
    this.element = element;
  }

  set(attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      if (value === false || value === null || value === undefined) {
        this.element?.removeAttribute(key);
      } else {
        this.element?.setAttribute(key, String(value));
      }
    }

    return this;
  }

  has(key) {
    return this.element?.hasAttribute(key);
  }

  remove(...keys) {
    for (const key of keys) {
      this.element?.removeAttribute(key);
    }

    return this;
  }

  toggle(keyOrKeys, force) {
    const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];

    for (const key of keys) {
      const has = this.element?.hasAttribute(key);

      if (force === undefined) {
        if (has) {
          this.element?.removeAttribute(key);
        } else {
          this.element?.setAttribute(key, '');
        }
      } else if (force) {
        this.element?.setAttribute(key, '');
      } else {
        this.element?.removeAttribute(key);
      }
    }

    return this;
  }
}
