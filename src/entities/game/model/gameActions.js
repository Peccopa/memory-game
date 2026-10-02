export const NEW_GAME = 'game/newGame';
export const OPEN_CARD = 'game/openCard';

export const newGame = () => ({
  type: NEW_GAME,
});

export const openCard = (index) => ({
  type: OPEN_CARD,
  payload: {
    index,
  },
});
