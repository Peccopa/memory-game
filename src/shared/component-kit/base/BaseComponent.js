import DomFacade from './managers/DomFacade';

export default class BaseComponent {
  _dom;
  _parent = null;

  constructor({
    tag,
    namespace,
    children,
    classes,
    listeners,
    attributes,
    content,
    id,
    title,
  } = {}) {
    this._dom = new DomFacade(this, tag, namespace);

    if (classes) this.setClasses(classes);
    if (children) this.setChildren(children);
    if (listeners) this.setListeners(listeners);
    if (attributes) this.setAttributes(attributes);
    if (content !== undefined) this.setContent(content);
    if (id !== undefined) this.setId(id);
    if (title !== undefined) this.setTitle(title);
  }

  // ===== Core Properties =====

  get element() {
    return this._dom.element.domElement;
  }

  get parent() {
    return this._parent;
  }

  get children() {
    return this._dom.children.list;
  }

  get root() {
    return this._parent ? this._parent.root : this;
  }

  get id() {
    return this.element?.id ?? '';
  }

  get content() {
    if (this._dom.children.list.length > 0) return null;
    return this.element?.textContent ?? '';
  }

  setElement(element) {
    if (!this.isValidElement(element)) {
      throw new TypeError('Invalid element for this component');
    }

    this._dom.element.setElement(element);
  }

  isValidElement(element) {
    return !!element;
  }

  // ===== Parent / Hierarchy =====

  setParent(parent) {
    this._parent = parent;
    return this;
  }

  findParent(Class) {
    return this._dom.hierarchy.findParent(Class);
  }

  findChild(Class) {
    return this._dom.hierarchy.findChild(Class);
  }

  findParentByClass(className) {
    return this._dom.hierarchy.findParentByClass(className);
  }

  findParentById(id) {
    return this._dom.hierarchy.findParentById(id);
  }

  findChildByClass(className) {
    return this._dom.hierarchy.findChildByClass(className);
  }

  findChildById(id) {
    return this._dom.hierarchy.findChildById(id);
  }

  detach() {
    this.parent?._dom.children.detach(this);
    return this;
  }

  destroy() {
    this._dom.events.destroy();
    this._dom.children.destroy();
    this.element?.remove();
    this._parent = null;
    return this;
  }

  // ===== Class Management =====

  setClasses(classes) {
    this._dom.classes.add(classes);
    return this;
  }
  removeClasses(classes) {
    this._dom.classes.remove(classes);
    return this;
  }
  replaceClasses(oldClasses, newClasses) {
    this._dom.classes.replace(oldClasses, newClasses);
    return this;
  }
  toggleClasses(classes, force) {
    this._dom.classes.toggle(classes, force);
    return this;
  }
  hasClasses(classes) {
    return this._dom.classes.has(classes);
  }

  // ===== Attribute Management =====

  setAttributes(attributes) {
    this._dom.attributes.set(attributes);
    return this;
  }
  removeAttributes(...keys) {
    this._dom.attributes.remove(...keys);
    return this;
  }
  toggleAttributes(keyOrKeys, force) {
    this._dom.attributes.toggle(keyOrKeys, force);
    return this;
  }
  hasAttribute(key) {
    return this._dom.attributes.has(key);
  }

  // ===== Children Management =====

  setChildren(children) {
    this._dom.children.set(children);
    return this;
  }
  appendChildren(children) {
    this._dom.children.append(children);
    return this;
  }
  detachChildren(children) {
    this._dom.children.detach(children);
    return this;
  }
  destroyChildren(children) {
    this._dom.children.destroy(children);
    return this;
  }

  // ===== Event Management =====

  setListeners(listeners) {
    this._dom.events.add(listeners);
    return this;
  }
  removeListeners() {
    this._dom.events.removeAll();
    return this;
  }
  addSubscriptions(unsubscribe) {
    this._dom.events.addSubscriptions(unsubscribe);
    return this;
  }

  // ===== Content Management =====

  setContent(content) {
    this._dom.content.set(content);
    return this;
  }
  clearContent() {
    this._dom.content.clear();
    return this;
  }

  // ===== ID / Title Management =====

  setId(id) {
    if (this.element) this.element.id = id;
    return this;
  }
  setTitle(title) {
    if (this.element instanceof HTMLElement) this.element.title = title;
    return this;
  }

  // ===== Style Management =====

  setStyle(styles) {
    this._dom.styles.set(styles);
    return this;
  }
  removeStyle(...keys) {
    this._dom.styles.remove(...keys);
    return this;
  }

  // ===== Visibility =====

  show(animated = true, duration = 300) {
    this._dom.visibility.show(animated, duration);
    return this;
  }
  hide(animated = true, duration = 300) {
    this._dom.visibility.hide(animated, duration);
    return this;
  }
}
