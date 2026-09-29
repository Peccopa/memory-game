import BaseComponent from '../../base/BaseComponent';

export default class ContainerComponent extends BaseComponent {
  constructor({ ...rest } = {}) {
    super({
      tag: 'div',
      ...rest,
    });
  }

  get container() {
    if (!(this.element instanceof HTMLDivElement)) {
      throw new TypeError('Element is not a container');
    }
    return this.element;
  }

  getChildren() {
    return this.container.children;
  }
}
