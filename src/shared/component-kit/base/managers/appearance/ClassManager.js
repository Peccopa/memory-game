export default class ClassManager {
  element;

  constructor(element) {
    this.element = element;
  }

  normalize(classes) {
    return Array.isArray(classes) ? classes : classes.split(' ');
  }

  get classList() {
    if (
      this.element instanceof HTMLElement ||
      this.element instanceof SVGElement
    ) {
      return this.element.classList;
    }
    return null;
  }

  has(classes) {
    return this.normalize(classes).every(
      (cls) => this.classList?.contains(cls) ?? false,
    );
  }

  add(classes) {
    this.classList?.add(...this.normalize(classes));
    return this;
  }

  remove(classes) {
    this.classList?.remove(...this.normalize(classes));
    return this;
  }

  toggle(classes, force) {
    for (const cls of this.normalize(classes))
      this.classList?.toggle(cls, force);
    return this;
  }

  replace(oldClasses, newClasses) {
    const oldArray = this.normalize(oldClasses);
    const newArray = this.normalize(newClasses);
    for (const cls of oldArray) this.classList?.remove(cls);
    for (const cls of newArray) this.classList?.add(cls);
    return this;
  }
}
