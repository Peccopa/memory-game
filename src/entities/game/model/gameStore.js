import StateKit from '../../../shared/state-kit';
import { initialGameState } from './gameState';
import { gameReducer } from './gameReducer';

export const gameState = new StateKit(initialGameState);

gameState.addReducer(gameReducer);
