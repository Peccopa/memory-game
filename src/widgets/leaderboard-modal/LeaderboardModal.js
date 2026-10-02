import {
  ContainerComponent,
  ButtonComponent,
  TextComponent,
} from '../../shared/component-kit';
import {
  getLeaderboard,
  formatDate,
} from '../../entities/leaderboard/model/leaderboard';
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

    this.handleBackdropClick = (event) => {
      if (event.target === this.element) {
        gameState.dispatch(closeLeaderboard());
      }
    };

    this.element.addEventListener('click', this.handleBackdropClick);

    this.handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        gameState.dispatch(closeLeaderboard());
      }
    };

    document.addEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const leaderboard = getLeaderboard();

    const title = new TextComponent({
      tag: 'h2',
      content: 'Leaderboard',
    });

    const table = new ContainerComponent({
      tag: 'table',
    });

    const headerRow = new ContainerComponent({
      tag: 'tr',
      children: [
        new TextComponent({
          tag: 'th',
          content: 'Place',
        }),
        new TextComponent({
          tag: 'th',
          content: 'Moves',
        }),
        new TextComponent({
          tag: 'th',
          content: 'Date',
        }),
      ],
    });

    table.appendChildren(headerRow);

    leaderboard.forEach((result, index) => {
      const row = new ContainerComponent({
        tag: 'tr',
        children: [
          new TextComponent({
            tag: 'td',
            content: String(index + 1),
          }),
          new TextComponent({
            tag: 'td',
            content: String(result.moves),
          }),
          new TextComponent({
            tag: 'td',
            content: formatDate(result.date),
          }),
        ],
      });

      table.appendChildren(row);
    });

    const closeButton = new ButtonComponent({
      content: 'Close',
      listeners: {
        click: () => {
          gameState.dispatch(closeLeaderboard());
        },
      },
    });

    this.setChildren([title, table, closeButton]);

    return this;
  }

  destroy() {
    this.element.removeEventListener('click', this.handleBackdropClick);
    document.removeEventListener('keydown', this.handleKeyDown);
    super.destroy();
  }
}
