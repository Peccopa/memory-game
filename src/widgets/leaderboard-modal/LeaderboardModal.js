import {
  ContainerComponent,
  ButtonComponent,
  TextComponent,
} from '../../shared/component-kit';
import { getLeaderboard } from '../../entities/leaderboard/model/leaderboard';
import { closeLeaderboard } from '../../entities/game/model/gameActions';
import { gameState } from '../../entities/game/model/gameStore';

import styles from './LeaderboardModal.module.css';

export default class LeaderboardModal extends ContainerComponent {
  constructor({ ...rest } = {}) {
    super({
      tag: 'div',
      classes: styles['leaderboard-modal'],
      ...rest,
    });

    this.render();
  }

  render() {
    const leaderboard = getLeaderboard();

    const title = new TextComponent({
      tag: 'h2',
      content: 'Leaderboard',
    });

    const entries = leaderboard.map((result, index) => {
      return new TextComponent({
        content: `${index + 1}. ${result.moves} moves — ${result.date}`,
      });
    });

    const closeButton = new ButtonComponent({
      content: 'Close',
      listeners: {
        click: () => {
          gameState.dispatch(closeLeaderboard());
        },
      },
    });

    this.setChildren([title, ...entries, closeButton]);

    return this;
  }
}
