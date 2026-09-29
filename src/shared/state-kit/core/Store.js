export default class Store {
  state;
  listeners = [];

  constructor(initialState) {
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  setState(newState, action) {
    this.state = newState;

    for (const listener of this.listeners) {
      listener(this.state, action);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}
