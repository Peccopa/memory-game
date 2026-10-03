import {
  ContainerComponent,
  ButtonComponent,
} from '../../shared/component-kit';
import { gameState } from '../../entities/game/model/gameStore';
import { openCard, closeMismatch } from '../../entities/game/model/gameActions';

import styles from './GameBoard.module.css';
import { MISMATCH_TIMER_DELAY } from '../../shared/config/game';

import { getCardView } from '../../entities/card/model/cardView';

let hintShown = false;

export default class GameBoard extends ContainerComponent {
  constructor({ ...rest } = {}) {
    super({
      tag: 'section',
      id: 'game-board',
      classes: styles['game-board'],
      ...rest,
    });

    this.mismatchTimer = null;

    this.render();

    this.unsubscribe = gameState.subscribe(() => {
      this.render();
    });

    if (!hintShown) {
      const cards = gameState.getState().deck.map((value) => {
        const { suit, rank } = getCardView(value);
        return `[${rank}${suit}]`;
      });

      const hint = cards
        .reduce((rows, card, index) => {
          if (index % 4 === 0) {
            rows.push([]);
          }

          rows[rows.length - 1].push(card);
          return rows;
        }, [])
        .map((row) => row.join(' '))
        .join('\n');

      console.log(`🃏 Card hint:\n${hint}`);

      hintShown = true;
    }
  }

  render() {
    const {
      deck,
      firstCard,
      secondCard,
      matchedCards,
      isLocked,
      isModalOpen,
      isLeaderboardOpen,
    } = gameState.getState();

    const cards = deck.map((value, index) => {
      const { suit, rank } = getCardView(value);

      const isRedSuit = suit === '♥' || suit === '♦';

      return new ButtonComponent({
        disabled: isLocked || isModalOpen || isLeaderboardOpen,
        classes: [
          styles.card,
          index === firstCard ||
          index === secondCard ||
          matchedCards.includes(index)
            ? styles.open
            : styles.closed,
          isRedSuit && styles.red,
        ],
        content:
          index === firstCard ||
          index === secondCard ||
          matchedCards.includes(index)
            ? `${rank} ${suit}`
            : '',
        attributes: {
          'data-card-index': String(index),
          'data-card-value': String(value),
        },
        listeners: {
          click: () => {
            gameState.dispatch(openCard(index));
          },
        },
      });
    });

    this.setChildren(cards);

    if (
      isLocked &&
      firstCard !== null &&
      secondCard !== null &&
      this.mismatchTimer === null
    ) {
      this.mismatchTimer = setTimeout(() => {
        this.mismatchTimer = null;
        gameState.dispatch(closeMismatch());
      }, MISMATCH_TIMER_DELAY);
    }

    return this;
  }

  destroy() {
    if (this.mismatchTimer !== null) {
      clearTimeout(this.mismatchTimer);
      this.mismatchTimer = null;
    }

    this.unsubscribe?.();
    super.destroy();
  }
}
