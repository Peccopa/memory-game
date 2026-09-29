import {
  ContainerComponent,
  ButtonComponent,
  TextComponent,
} from '../../shared/component-kit';
import styles from './GameHeader.module.css';

export default class GameHeader extends ContainerComponent {
  constructor({ ...rest } = {}) {
    super({
      tag: 'header',
      id: 'game-header',
      classes: styles['game-header'],
      ...rest,
    });

    this.render();
  }

  render() {
    const title = new TextComponent({
      tag: 'h1',
      content: 'Memory Game',
    });

    const newGameButton = new ButtonComponent({
      content: 'New Game',
    });

    const leaderboardButton = new ButtonComponent({
      content: 'Leaderboard',
    });

    this.setChildren([title, newGameButton, leaderboardButton]);

    return this;
  }
}
