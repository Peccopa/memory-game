import Store from './core/Store';
import Dispatcher from './core/Dispatcher';

export class StateKit {
  store;
  dispatcher;

  constructor(initialState) {
    this.store = new Store(initialState);
    this.dispatcher = new Dispatcher(this.store);
  }

  addReducer(...reducers) {
    this.dispatcher.addReducer(...reducers);
  }

  removeReducer(reducer) {
    this.dispatcher.removeReducer(reducer);
  }

  addAfterware(...afterwares) {
    this.dispatcher.addAfterware(...afterwares);
  }

  removeAfterware(mw) {
    this.dispatcher.removeAfterware(mw);
  }

  addMiddleware(...mws) {
    this.dispatcher.addMiddleware(...mws);
  }

  removeMiddleware(mw) {
    this.dispatcher.removeMiddleware(mw);
  }

  dispatch(action) {
    return this.dispatcher.dispatch(action).catch((error) => {
      console.error('[StateKit dispatch error]:', error);
    });
  }

  subscribe(listener) {
    return this.store.subscribe(listener);
  }

  getState() {
    return this.store.getState();
  }
}

export default StateKit;
