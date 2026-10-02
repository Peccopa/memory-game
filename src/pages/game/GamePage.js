import { ContainerComponent } from '../../shared/component-kit';
import GameHeader from '../../widgets/game-header/GameHeader';
import GameBoard from '../../widgets/game-board/GameBoard';
import GameCounters from '../../widgets/game-counters/GameCounters';

export default class GamePage extends ContainerComponent {
  constructor({ ...rest } = {}) {
    super({
      tag: 'div',
      id: 'game-page',
      ...rest,
    });

    this.render();
  }

  render() {
    const header = new GameHeader();

    const counters = new GameCounters();

    const board = new GameBoard();

    const main = new ContainerComponent({
      tag: 'main',
      children: [counters, board],
    });

    this.setChildren([header, main]);

    return this;
  }
}
