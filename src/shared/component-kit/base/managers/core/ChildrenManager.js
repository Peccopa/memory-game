export default class ChildrenManager {
  element;
  owner;
  children = [];

  constructor(owner, element) {
    this.owner = owner;
    this.element = element;
  }

  get list() {
    return this.children;
  }

  add(children, append) {
    const childrenArray = Array.isArray(children) ? children : [children];
    const fragment = document.createDocumentFragment();

    if (!append) this.destroy();

    for (const child of childrenArray) {
      if (child.parent) child.parent.detachChildren(child);
      if (child.element) fragment.append(child.element);
      if (!this.children.includes(child)) this.children.push(child);
      child['setParent'](this.owner);
    }

    this.element?.append(fragment);

    return this;
  }

  remove(children, full) {
    const childrenArray = Array.isArray(children) ? [...children] : [children];

    for (const child of childrenArray) {
      const index = this.children.indexOf(child);
      if (index !== -1) this.children.splice(index, 1);
      child.element?.remove();
      child['setParent'](null);
      if (full) child.destroy();
    }

    return this;
  }

  set(children) {
    return this.add(children, false);
  }

  append(children) {
    return this.add(children, true);
  }

  detach(children = this.children) {
    return this.remove(children, false);
  }

  destroy(children = this.children) {
    return this.remove(children, true);
  }
}
