export default class EventManager {
  element;
  listeners = [];
  subscriptions = [];

  constructor(element) {
    this.element = element;
  }

  add(listeners) {
    for (const [event, handler] of Object.entries(listeners)) {
      this.element?.addEventListener(event, handler);
      const exists = this.listeners.some(
        (listener) => listener.event === event && listener.handler === handler,
      );

      if (!exists) this.listeners.push({ event, handler });
    }

    return this;
  }

  removeAll() {
    for (const { event, handler } of this.listeners) {
      this.element?.removeEventListener(event, handler);
    }
    this.listeners = [];

    return this;
  }

  addSubscriptions(unsubscribe) {
    const list = Array.isArray(unsubscribe) ? unsubscribe : [unsubscribe];
    this.subscriptions.push(...list);

    return this;
  }

  clearSubscriptions() {
    for (const unsubscribe of this.subscriptions) {
      try {
        unsubscribe();
      } catch (error) {
        console.error('Subscription cleanup failed', error);
      }
    }

    this.subscriptions = [];

    return this;
  }

  destroy() {
    this.removeAll();
    this.clearSubscriptions();
  }
}
