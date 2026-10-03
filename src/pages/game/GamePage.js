import { ContainerComponent } from '../../shared/component-kit';

import GameHeader from '../../widgets/game-header/GameHeader';
import GameBoard from '../../widgets/game-board/GameBoard';
import GameModal from '../../widgets/game-modal/GameModal';
import LeaderboardModal from '../../widgets/leaderboard-modal/LeaderboardModal';

import { gameState } from '../../entities/game/model/gameStore';
import { saveResult } from '../../entities/leaderboard/model/leaderboard';

import styles from './GamePage.module.css';

export default class GamePage extends ContainerComponent {
  constructor({ ...rest } = {}) {
    super({
      tag: 'div',
      id: 'game-page',
      classes: styles['game-page'],
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

      this.scrollPosition = 0;

      this.render();
    });
  }

  render() {
    const { isModalOpen, isLeaderboardOpen } = gameState.getState();

    this.updateBodyScroll(isModalOpen, isLeaderboardOpen);

    const header = new GameHeader();
    const board = new GameBoard();

    const main = new ContainerComponent({
      tag: 'main',
      children: [board],
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

  updateBodyScroll(isModalOpen, isLeaderboardOpen) {
    const isModalOpenNow = isModalOpen || isLeaderboardOpen;

    if (isModalOpenNow && document.body.style.overflow !== 'hidden') {
      this.scrollPosition = window.scrollY;
      document.body.style.overflow = 'hidden';
    }

    if (!isModalOpenNow && document.body.style.overflow === 'hidden') {
      document.body.style.overflow = '';
      window.scrollTo(0, this.scrollPosition);
    }
  }

  destroy() {
    document.body.style.overflow = '';
    this.unsubscribe?.();
    super.destroy();
  }
}
