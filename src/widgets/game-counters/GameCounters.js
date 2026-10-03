import { ContainerComponent, TextComponent } from '../../shared/component-kit';
import { gameState } from '../../entities/game/model/gameStore';
import { PAIR_COUNT } from '../../shared/config/game';

import styles from './GameCounters.module.css';

export default class GameCounters extends ContainerComponent {
  constructor({ ...rest } = {}) {
    super({
      tag: 'section',
      id: 'game-counters',
      classes: styles['game-counters'],
      ...rest,
    });

    this.render();

    this.unsubscribe = gameState.subscribe(() => {
      this.render();
    });
  }

  render() {
    const { moves, pairs } = gameState.getState();

    const movesText = new TextComponent({
      classes: styles.counter,
      content: `Moves: ${moves}`,
    });

    const pairsText = new TextComponent({
      classes: styles.counter,
      content: `Pairs: ${pairs} / ${PAIR_COUNT}`,
    });

    this.setChildren([movesText, pairsText]);

    return this;
  }

  destroy() {
    this.unsubscribe?.();
    super.destroy();
  }
}
