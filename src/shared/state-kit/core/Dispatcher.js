export default class Dispatcher {
  store;
  reducers = [];
  afterwares = [];
  middlewares = [];

  queue = Promise.resolve();

  constructor(store) {
    this.store = store;
  }

  addReducer(...reducers) {
    this.reducers.push(...reducers);
  }

  removeReducer(reducer) {
    this.reducers = this.reducers.filter((r) => r !== reducer);
  }

  addAfterware(...afterwares) {
    this.afterwares.push(...afterwares);
  }

  removeAfterware(mw) {
    this.afterwares = this.afterwares.filter((m) => m !== mw);
  }

  addMiddleware(...mws) {
    this.middlewares.push(...mws);
  }

  removeMiddleware(mw) {
    this.middlewares = this.middlewares.filter((m) => m !== mw);
  }

  dispatch(action) {
    const dispatchTask = this.queue.then(() => this.runMiddlewares(action));
    this.queue = dispatchTask.catch(() => undefined);
    return dispatchTask;
  }

  async runMiddlewares(action) {
    let index = -1;

    const next = async (act) => {
      index += 1;

      const mw = this.middlewares[index];
      await (mw
        ? mw({
            getState: () => this.store.getState(),
            action: act,
            next,
          })
        : this.process(act));
    };

    await next(action);
  }

  async process(action) {
    const previousState = this.store.getState();
    let nextState = previousState;

    for (const reducer of this.reducers) {
      nextState = reducer(nextState, action);
    }

    this.store.setState(nextState, action);

    for (const afterware of this.afterwares) {
      await afterware({ prevState: previousState, nextState, action });
    }
  }
}
