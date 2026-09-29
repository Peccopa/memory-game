import {
  ContainerComponent,
  ButtonComponent,
} from '../../shared/component-kit';

import { gameState } from '../../entities/game/model/gameStore';

import styles from './GameBoard.module.css';

export default class GameBoard extends ContainerComponent {
  constructor({ ...rest } = {}) {
    super({
      tag: 'section',
      id: 'game-board',
      classes: styles['game-board'],
      ...rest,
    });

    this.render();

    this.unsubscribe = gameState.subscribe(() => {
      this.render();
    });
  }

  render() {
    const { deck } = gameState.getState();

    const cards = deck.map((value, index) => {
      return new ButtonComponent({
        classes: styles.card,
        content: '?',
        attributes: {
          'data-card-index': String(index),
          'data-card-value': String(value),
        },
      });
    });

    this.setChildren(cards);

    return this;
  }

  destroy() {
    this.unsubscribe?.();
    super.destroy();
  }
}
