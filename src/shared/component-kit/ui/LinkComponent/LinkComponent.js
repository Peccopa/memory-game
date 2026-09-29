import BaseComponent from '../../base/BaseComponent';

export default class LinkComponent extends BaseComponent {
  constructor({ href = '#', target = '_self', rel, ...rest } = {}) {
    super({
      tag: 'a',
      ...rest,
    });

    this.setHref(href);
    this.setTarget(target);
    if (rel) this.setRel(rel);
  }

  get anchor() {
    if (!(this.element instanceof HTMLAnchorElement)) {
      throw new TypeError('Element is not an anchor');
    }
    return this.element;
  }

  setHref(href) {
    this.anchor.href = href;
    return this;
  }

  setTarget(target) {
    this.anchor.target = target;
    return this;
  }

  setRel(related) {
    this.anchor.rel = related;
    return this;
  }
}
