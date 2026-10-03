const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = ['A', 'K', 'Q', 'J', '10', '9', '8', '7'];

export const getCardView = (value) => ({
  suit: SUITS[value % SUITS.length],
  rank: RANKS[value],
});
