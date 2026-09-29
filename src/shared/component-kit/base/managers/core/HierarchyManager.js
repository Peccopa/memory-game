export default class HierarchyManager {
  owner;

  constructor(owner) {
    this.owner = owner;
  }

  // ===== Parent Search =====

  findParent(Class) {
    let current = this.owner.parent;
    while (current) {
      if (current instanceof Class) return current;
      current = current.parent;
    }
    return null;
  }

  findParentByClass(className) {
    let current = this.owner.parent;
    while (current) {
      if (current.element?.classList.contains(className)) return current;
      current = current.parent;
    }
    return null;
  }

  findParentById(id) {
    let current = this.owner.parent;
    while (current) {
      if (current.id === id) return current;
      current = current.parent;
    }
    return null;
  }

  // ===== Child Search =====

  findChild(Class) {
    for (const child of this.owner.children) {
      if (child instanceof Class) return child;
      const nested = child.findChild(Class);
      if (nested) return nested;
    }

    return null;
  }

  findChildByClass(className) {
    for (const child of this.owner.children) {
      if (child.element?.classList.contains(className)) return child;
      const nested = child.findChildByClass(className);
      if (nested) return nested;
    }

    return null;
  }

  findChildById(id) {
    for (const child of this.owner.children) {
      if (child.id === id) return child;
      const nested = child.findChildById(id);
      if (nested) return nested;
    }

    return null;
  }
}
