import TextComponent from '../TextComponent/TextComponent';

export default class HeadingComponent extends TextComponent {
  constructor({ level = 1, ...rest } = {}) {
    super({
      tag: `h${level}`,
      content: 'Header',
      ...rest,
    });
  }

  get heading() {
    const element = this.element;

    if (!element || !this.isValidElement(element)) {
      throw new TypeError('Element is not a heading');
    }

    return element;
  }

  setLevel(level) {
    const oldElement = this.heading;
    const newElement = document.createElement(`h${level}`);

    newElement.textContent = oldElement.textContent;
    newElement.className = oldElement.className;

    for (const attribute of oldElement.attributes) {
      newElement.setAttribute(attribute.name, attribute.value);
    }

    oldElement.replaceWith(newElement);

    this.setElement(newElement);

    return this;
  }

  isValidElement(element) {
    return element instanceof HTMLElement && /^H[1-6]$/.test(element.tagName);
  }
}
