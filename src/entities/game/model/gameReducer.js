import {
  NEW_GAME,
  OPEN_CARD,
  CLOSE_MISMATCH,
  CLOSE_MODAL,
  OPEN_LEADERBOARD,
  CLOSE_LEADERBOARD,
} from './gameActions';
import { PAIR_COUNT } from '../../../shared/config/game';
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

      if (state.firstCard === index) {
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
        const pairs = isMatch ? state.pairs + 1 : state.pairs;
        const isGameOver = pairs === PAIR_COUNT;

        return {
          ...state,
          firstCard: isMatch ? null : state.firstCard,
          secondCard: isMatch ? null : secondCard,
          moves: state.moves + 1,
          pairs,
          isGameOver,
          matchedCards: isMatch
            ? [...state.matchedCards, state.firstCard, secondCard]
            : state.matchedCards,
          isLocked: !isMatch,
          isModalOpen: isGameOver,
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

    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };

    case OPEN_LEADERBOARD:
      return {
        ...state,
        isLeaderboardOpen: true,
      };

    case CLOSE_LEADERBOARD:
      return {
        ...state,
        isLeaderboardOpen: false,
      };

    default:
      return state;
  }
};
