import { ContainerComponent } from '../../shared/component-kit';

import GameHeader from '../../widgets/game-header/GameHeader';
import GameCounters from '../../widgets/game-counters/GameCounters';
import GameBoard from '../../widgets/game-board/GameBoard';
import GameModal from '../../widgets/game-modal/GameModal';

import { gameState } from '../../entities/game/model/gameStore';

export default class GamePage extends ContainerComponent {
  constructor({ ...rest } = {}) {
    super({
      tag: 'div',
      id: 'game-page',
      ...rest,
    });

    this.render();

    this.unsubscribe = gameState.subscribe(() => {
      this.render();
    });
  }

  render() {
    const { isModalOpen } = gameState.getState();

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

    this.setChildren(children);

    return this;
  }

  destroy() {
    this.unsubscribe?.();
    super.destroy();
  }
}
