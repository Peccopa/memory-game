import BaseComponent from '../../base/BaseComponent';

export default class TextComponent extends BaseComponent {
  constructor({ tag = 'p', ...rest } = {}) {
    super({
      tag,
      ...rest,
    });
  }

  appendText(text) {
    const current = this.content ?? '';
    this.setContent(`${current}${text}`);
    return this;
  }

  prependText(text) {
    const current = this.content ?? '';
    this.setContent(`${text}${current}`);
    return this;
  }

  uppercase() {
    const current = this.content ?? '';
    this.setContent(current.toString().toUpperCase());
    return this;
  }

  lowercase() {
    const current = this.content ?? '';
    this.setContent(current.toString().toLowerCase());
    return this;
  }

  capitalize() {
    const current = this.content ?? '';
    this.setContent(
      current.toString().replaceAll(/\b\w/g, (char) => char.toUpperCase()),
    );
    return this;
  }
}
