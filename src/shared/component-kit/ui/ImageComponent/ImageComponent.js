import BaseComponent from '../../base/BaseComponent';

export default class ImageComponent extends BaseComponent {
  constructor({ source = '', alt = '', width, height, ...rest } = {}) {
    super({
      tag: 'img',
      ...rest,
    });

    this.setSrc(source);
    this.setAlt(alt);
    if (width || height) this.setDimensions(width, height);
  }

  get image() {
    if (!(this.element instanceof HTMLImageElement)) {
      throw new TypeError('Element is not an image');
    }
    return this.element;
  }

  setSrc(source) {
    this.image.src = source;
    return this;
  }

  setAlt(alt) {
    this.image.alt = alt;
    return this;
  }

  setDimensions(width, height) {
    if (width !== undefined) this.image.width = Number(width);
    if (height !== undefined) this.image.height = Number(height);
    return this;
  }
}
