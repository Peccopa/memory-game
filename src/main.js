import { TextComponent } from './shared/component-kit';

const title = new TextComponent({
  tag: 'h1',
  content: 'Memory Game',
});

document.body.replaceChildren(title.element);
