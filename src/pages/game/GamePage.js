import { ContainerComponent, TextComponent } from '../../shared/component-kit';
import GameHeader from '../../widgets/game-header/GameHeader';

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

    const moves = new TextComponent({
      content: 'Moves: 0',
    });

    const pairs = new TextComponent({
      content: 'Pairs: 0 / 8',
    });

    const counters = new ContainerComponent({
      tag: 'section',
      id: 'game-counters',
      children: [moves, pairs],
    });

    const board = new ContainerComponent({
      tag: 'section',
      id: 'game-board',
    });

    const main = new ContainerComponent({
      tag: 'main',
      children: [counters, board],
    });

    this.setChildren([header, main]);

    return this;
  }
}
