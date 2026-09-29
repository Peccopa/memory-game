export default class VisibilityManager {
  element;

  constructor(element) {
    this.element = element;
  }

  show(animated = true, duration = 500) {
    const element = this.element;
    if (!(element instanceof HTMLElement)) return this;

    element.removeAttribute('hidden');

    if (animated) {
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = '0';

      requestAnimationFrame(() => {
        element.style.opacity = '1';
      });
    } else {
      element.style.opacity = '1';
      element.style.transition = '';
    }

    return this;
  }

  hide(animated = true, duration = 500) {
    if (!this.element) return this;

    if (animated && this.element instanceof HTMLElement) {
      this.element.style.transition = `opacity ${duration}ms`;
      this.element.style.opacity = '0';
      this.element.style.transitionTimingFunction = 'ease-in-out';

      setTimeout(() => {
        this.element?.setAttribute('hidden', 'true');
      }, duration);
    } else {
      this.element.setAttribute('hidden', 'true');
      if (this.element instanceof HTMLElement) {
        this.element.style.opacity = '0';
        this.element.style.transition = '';
        this.element.style.transitionTimingFunction = '';
      }
    }

    return this;
  }
}
