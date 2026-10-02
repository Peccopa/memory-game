import {
  ContainerComponent,
  ButtonComponent,
  TextComponent,
} from '../../shared/component-kit';

// import LeaderboardModal from '../leaderboard-modal/LeaderboardModal';

import { gameState } from '../../entities/game/model/gameStore';
import {
  newGame,
  openLeaderboard,
} from '../../entities/game/model/gameActions';

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
      listeners: {
        click: () => {
          gameState.dispatch(newGame());
        },
      },
    });

    const leaderboardButton = new ButtonComponent({
      content: 'Leaderboard',
      listeners: {
        click: () => {
          gameState.dispatch(openLeaderboard());
        },
      },
    });

    this.setChildren([title, newGameButton, leaderboardButton]);

    return this;
  }
}
