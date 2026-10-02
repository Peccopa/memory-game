import { createCardDeck } from '../../card/model/cardData';
import { shuffle } from '../../../shared/utils/shuffle';

export const createGameState = () => ({
  deck: shuffle(createCardDeck()),
  moves: 0,
  pairs: 0,
  firstCard: null,
  secondCard: null,
  matchedCards: [],
  isLocked: false,
});
