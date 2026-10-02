import { ContainerComponent } from '../../shared/component-kit';

import GameHeader from '../../widgets/game-header/GameHeader';
import GameCounters from '../../widgets/game-counters/GameCounters';
import GameBoard from '../../widgets/game-board/GameBoard';
import GameModal from '../../widgets/game-modal/GameModal';
import LeaderboardModal from '../../widgets/leaderboard-modal/LeaderboardModal';

import { gameState } from '../../entities/game/model/gameStore';
import { saveResult } from '../../entities/leaderboard/model/leaderboard';

export default class GamePage extends ContainerComponent {
  constructor({ ...rest } = {}) {
    super({
      tag: 'div',
      id: 'game-page',
      ...rest,
    });

    this.resultSaved = false;

    this.render();

    this.unsubscribe = gameState.subscribe(() => {
      const { isGameOver, moves } = gameState.getState();

      if (!isGameOver) {
        this.resultSaved = false;
      }

      if (isGameOver && !this.resultSaved) {
        saveResult(moves);
        this.resultSaved = true;
      }

      this.render();
    });
  }

  render() {
    const { isModalOpen, isLeaderboardOpen } = gameState.getState();

    const header = new GameHeader();
    const counters = new GameCounters();
    const board = new GameBoard();

    const main = new ContainerComponent({
      tag: 'main',
      children: [counters, board],
    });

    const children = [header, main];

    if (isModalOpen) {
      children.push(new GameModal());
    }

    if (isLeaderboardOpen) {
      children.push(new LeaderboardModal());
    }

    this.setChildren(children);

    return this;
  }

  destroy() {
    this.unsubscribe?.();
    super.destroy();
  }
}
