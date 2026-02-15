import ListContainer from './list.js';
import Block from '../blots/block.js';
import Container from '../blots/container.js';
import type Scroll from '../blots/scroll.js';
import Quill from '../core/quill.js';

class HierarchicalListContainer extends Container {}
HierarchicalListContainer.blotName = 'hierarchical-list-container';
HierarchicalListContainer.tagName = 'OL';

class HierarchicalListItem extends Block {
  static create(value: string) {
    const node = super.create() as HTMLElement;
    node.setAttribute('data-list', value);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('data-list') || undefined;
  }

  static register() {
    Quill.register(HierarchicalListContainer);
  }

  constructor(scroll: Scroll, domNode: HTMLElement) {
    super(scroll, domNode);
    const ui = domNode.ownerDocument.createElement('span');
    const listEventHandler = (e: Event) => {
      if (!scroll.isEnabled()) return;
      const format = this.statics.formats(domNode, scroll);
      if (format === 'checked') {
        this.format('list', 'unchecked');
        e.preventDefault();
      } else if (format === 'unchecked') {
        this.format('list', 'checked');
        e.preventDefault();
      }
    };
    ui.addEventListener('mousedown', listEventHandler);
    ui.addEventListener('touchstart', listEventHandler);
    this.attachUI(ui);
  }

  format(name: string, value: string) {
    if (name === this.statics.blotName && value) {
      this.domNode.setAttribute('data-list', value);
    } else {
      super.format(name, value);
    }
  }
}
HierarchicalListItem.blotName = 'hierarchical';
HierarchicalListItem.tagName = 'LI';

HierarchicalListContainer.allowedChildren = [HierarchicalListItem];
HierarchicalListItem.requiredContainer = HierarchicalListContainer;

export { HierarchicalListContainer, HierarchicalListItem as default };
