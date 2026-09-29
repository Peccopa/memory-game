import BaseComponent from '../../base/BaseComponent';

export default class ListComponent extends BaseComponent {
  constructor({ type = 'ul', items, ...rest } = {}) {
    super({
      tag: type,
      ...rest,
    });

    if (items) this.setItems(items);
  }

  setItems(items) {
    this.clearItems();
    for (const item of items) this.addItem(item);
    return this;
  }

  addItem(item) {
    const li = new BaseComponent({ tag: 'li', content: item });
    this.appendChildren(li);
    return this;
  }

  removeItem(index) {
    const child = this.children[index];
    if (child) this.destroyChildren(child);
    return this;
  }

  clearItems() {
    this.destroyChildren();
    return this;
  }
}
