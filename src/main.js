import {
  ContainerComponent,
  ButtonComponent,
  TextComponent,
} from './shared/component-kit';
import StateKit from './shared/state-kit';
import { Router } from './shared/router-kit';

// === Router Kit ===

const router = new Router({
  '/': {
    name: 'home',
  },
  '/about': {
    name: 'about',
  },
});

router.subscribe(({ route }) => {
  if (route?.name === 'home') {
    renderHome();
  }

  if (route?.name === 'about') {
    renderAbout();
  }
});

router.start();

// === Home ===

function renderHome() {
  const initialState = { count: 0 };

  const stateKit = new StateKit(initialState);

  const increment = (state, action) => {
    if (action.type === 'INCREMENT') {
      return {
        ...state,
        count: state.count + 1,
      };
    }

    return state;
  };

  stateKit.addReducer(increment);

  const counter = new TextComponent({
    tag: 'p',
    content: `Count: ${stateKit.getState().count}`,
  });

  const button = new ButtonComponent({
    content: 'Increment',
  });

  button.setListeners({
    click: () => {
      stateKit.dispatch({ type: 'INCREMENT' });
    },
  });

  const link = document.createElement('a');
  link.href = '/about';
  link.textContent = 'About';

  stateKit.subscribe((state) => {
    counter.setContent(`Count: ${state.count}`);
  });

  const app = new ContainerComponent({
    id: 'app',
    classes: 'app',
    children: [counter, button],
  });

  document.body.replaceChildren(app.element, link);
}

// === About ===

function renderAbout() {
  const title = new TextComponent({
    tag: 'h1',
    content: 'About',
  });

  const link = document.createElement('a');
  link.href = '/';
  link.textContent = 'Home';

  const app = new ContainerComponent({
    id: 'app',
    classes: 'app',
    children: [title],
  });

  document.body.replaceChildren(app.element, link);
}
