import { ContainerComponent } from '../shared/component-kit';
import GamePage from '../pages/game/GamePage';

import styles from './App.module.css';

export default class App extends ContainerComponent {
  constructor({ ...rest } = {}) {
    super({
      id: 'app',
      classes: styles.app,
      ...rest,
    });

    this.render();
  }

  render() {
    const gamePage = new GamePage();

    this.setChildren([gamePage]);

    return this;
  }
}
