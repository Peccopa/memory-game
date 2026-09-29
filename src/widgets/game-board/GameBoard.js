import {
  ContainerComponent,
  ButtonComponent,
} from '../../shared/component-kit';

import { shuffle } from '../../shared/utils/shuffle';
import { createCardDeck } from '../../entities/card/model/cardData';

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
  }

  render() {
    const deck = shuffle(createCardDeck());

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
}
