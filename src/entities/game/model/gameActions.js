export const NEW_GAME = 'game/newGame';
export const OPEN_CARD = 'game/openCard';
export const CLOSE_MISMATCH = 'game/closeMismatch';
export const CLOSE_MODAL = 'game/closeModal';
export const OPEN_LEADERBOARD = 'game/openLeaderboard';
export const CLOSE_LEADERBOARD = 'game/closeLeaderboard';

export const newGame = () => ({
  type: NEW_GAME,
});

export const openCard = (index) => ({
  type: OPEN_CARD,
  payload: {
    index,
  },
});

export const closeMismatch = () => ({
  type: CLOSE_MISMATCH,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const openLeaderboard = () => ({
  type: OPEN_LEADERBOARD,
});

export const closeLeaderboard = () => ({
  type: CLOSE_LEADERBOARD,
});
