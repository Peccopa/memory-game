import { NEW_GAME, OPEN_CARD, CLOSE_MISMATCH } from './gameActions';
import { createGameState } from './createGameState';

export const gameReducer = (state, action) => {
  switch (action.type) {
    case NEW_GAME:
      return createGameState();

    case OPEN_CARD: {
      const { index } = action.payload;

      if (state.isLocked || state.matchedCards.includes(index)) {
        return state;
      }

      if (state.firstCard === null) {
        return {
          ...state,
          firstCard: index,
        };
      }

      if (state.secondCard === null) {
        const secondCard = index;
        const isMatch = state.deck[state.firstCard] === state.deck[secondCard];

        return {
          ...state,
          firstCard: isMatch ? null : state.firstCard,
          secondCard: isMatch ? null : secondCard,
          moves: state.moves + 1,
          pairs: isMatch ? state.pairs + 1 : state.pairs,
          matchedCards: isMatch
            ? [...state.matchedCards, state.firstCard, secondCard]
            : state.matchedCards,
          isLocked: !isMatch,
        };
      }

      return state;
    }

    case CLOSE_MISMATCH:
      return {
        ...state,
        firstCard: null,
        secondCard: null,
        isLocked: false,
      };

    default:
      return state;
  }
};
