import { NEW_GAME } from './gameActions';
import { createGameState } from './createGameState';

export const gameReducer = (state, action) => {
  switch (action.type) {
    case NEW_GAME:
      return createGameState();

    default:
      return state;
  }
};
