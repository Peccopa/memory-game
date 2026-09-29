import { PAIR_COUNT } from '../../../shared/config/game';

export const CARD_VALUES = Array.from(
  { length: PAIR_COUNT },
  (_, index) => index,
);

export const createCardDeck = () => {
  return [...CARD_VALUES, ...CARD_VALUES];
};
