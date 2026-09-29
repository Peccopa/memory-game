import {
  ElementManager,
  HierarchyManager,
  ChildrenManager,
  ClassManager,
  StyleManager,
  VisibilityManager,
  ContentManager,
  AttributeManager,
  EventManager,
} from '.';

export default class DomFacade {
  core;
  appearance;

  behavior;

  constructor(owner, tag = 'div', namespace) {
    const elementManager = new ElementManager(tag, namespace);
    const element = elementManager.domElement;

    this.core = {
      element: elementManager,
      hierarchy: new HierarchyManager(owner),
      children: new ChildrenManager(owner, element),
    };

    this.appearance = {
      classes: new ClassManager(element),
      styles: new StyleManager(element),
      visibility: new VisibilityManager(element),
      content: new ContentManager(element),
    };

    this.behavior = {
      attributes: new AttributeManager(element),
      events: new EventManager(element),
    };
  }

  // ===== Core =====

  get element() {
    return this.core.element;
  }

  get hierarchy() {
    return this.core.hierarchy;
  }

  get children() {
    return this.core.children;
  }

  // ===== Appearance =====

  get classes() {
    return this.appearance.classes;
  }

  get styles() {
    return this.appearance.styles;
  }

  get visibility() {
    return this.appearance.visibility;
  }

  get content() {
    return this.appearance.content;
  }

  // ===== Behavior =====

  get attributes() {
    return this.behavior.attributes;
  }

  get events() {
    return this.behavior.events;
  }
}
