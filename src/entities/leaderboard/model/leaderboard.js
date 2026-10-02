import {
  LEADERBOARD_KEY,
  LEADERBOARD_LIMIT,
} from '../../../shared/config/game';

export const getLeaderboard = () => {
  const data = localStorage.getItem(LEADERBOARD_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
};

export const saveResult = (moves) => {
  const leaderboard = getLeaderboard();

  const result = {
    moves,
    date: new Date().toISOString(),
  };

  const updatedLeaderboard = [...leaderboard, result]
    .sort((first, second) => {
      if (first.moves !== second.moves) {
        return first.moves - second.moves;
      }

      return new Date(first.date) - new Date(second.date);
    })
    .slice(0, LEADERBOARD_LIMIT);

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));

  return updatedLeaderboard;
};
