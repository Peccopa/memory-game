import {
  ContainerComponent,
  ButtonComponent,
  TextComponent,
} from '../../shared/component-kit';
import { gameState } from '../../entities/game/model/gameStore';
import { closeModal, newGame } from '../../entities/game/model/gameActions';
import styles from './GameModal.module.css';

export default class GameModal extends ContainerComponent {
  constructor({ ...rest } = {}) {
    super({
      tag: 'div',
      classes: styles['game-modal'],
      ...rest,
    });

    this.render();

    this.handleBackdropClick = (event) => {
      if (event.target === this.element) {
        gameState.dispatch(closeModal());
      }
    };

    this.element.addEventListener('click', this.handleBackdropClick);

    this.handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        gameState.dispatch(closeModal());
      }
    };

    document.addEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { moves } = gameState.getState();

    const title = new TextComponent({
      tag: 'h2',
      content: 'You win!',
    });

    const result = new TextComponent({
      content: `Moves: ${moves}`,
    });

    const newGameButton = new ButtonComponent({
      content: 'New Game',
      listeners: {
        click: () => {
          gameState.dispatch(newGame());
        },
      },
    });

    const closeButton = new ButtonComponent({
      content: 'Close',
      listeners: {
        click: () => {
          gameState.dispatch(closeModal());
        },
      },
    });

    const content = new ContainerComponent({
      children: [title, result, newGameButton, closeButton],
    });

    this.setChildren([content]);

    return this;
  }

  destroy() {
    this.element.removeEventListener('click', this.handleBackdropClick);
    document.removeEventListener('keydown', this.handleKeyDown);
    super.destroy();
  }
}
