import {
  ContainerComponent,
  ButtonComponent,
} from '../../shared/component-kit';
import { gameState } from '../../entities/game/model/gameStore';
import { openCard } from '../../entities/game/model/gameActions';
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
    const { deck, firstCard, secondCard, matchedCards } = gameState.getState();

    const cards = deck.map((value, index) => {
      return new ButtonComponent({
        classes: styles.card,
        content:
          index === firstCard ||
          index === secondCard ||
          matchedCards.includes(index)
            ? String(value)
            : '?',
        attributes: {
          'data-card-index': String(index),
          'data-card-value': String(value),
        },
        listeners: {
          click: () => {
            gameState.dispatch(openCard(index));
            console.log(gameState.getState());
          },
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
