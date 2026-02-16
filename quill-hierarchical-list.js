/**
 * Quill Hierarchical List Plugin
 * Adds hierarchical ordered list numbering (1, 1.1, 1.1.1, etc.) to Quill editor
 * 
 * Usage:
 *   import HierarchicalList from 'quill-hierarchical-list';
 *   Quill.register('modules/hierarchicalList', HierarchicalList);
 *   
 *   const quill = new Quill('#editor', {
 *     modules: {
 *       hierarchicalList: true
 *     }
 *   });
 */

class HierarchicalList {
  static moduleName = 'hierarchicalList';

  constructor(quill, options = {}) {
    this.quill = quill;
    this.options = options;
    this.extendListItem();
    this.registerIcon();
  }

  extendListItem() {
    const ListItem = this.quill.constructor.import('formats/list');

    const originalFormats = ListItem.formats;
    ListItem.formats = function (domNode) {
      const format = domNode.getAttribute('data-list');
      if (format === 'hierarchical') {
        return 'hierarchical';
      }
      return originalFormats.call(this, domNode);
    };

    const originalFormat = ListItem.prototype.format;
    ListItem.prototype.format = function (name, value) {
      if (name === 'list' && value === 'hierarchical') {
        this.domNode.setAttribute('data-list', 'hierarchical');
      } else {
        originalFormat.call(this, name, value);
      }
    };
  }

  registerIcon() {
    const icons = this.quill.constructor.import('ui/icons');
    icons.list = icons.list || {};
    icons.list.hierarchical = `<svg viewBox="0 0 18 18">
      <line class="ql-stroke" x1="3" y1="4" x2="15" y2="4"></line>
      <line class="ql-stroke" x1="3" y1="9" x2="15" y2="9"></line>
      <line class="ql-stroke" x1="3" y1="14" x2="15" y2="14"></line>
      <line class="ql-stroke" x1="7" y1="3" x2="7" y2="5"></line>
      <line class="ql-stroke" x1="11" y1="3" x2="11" y2="5"></line>
      <line class="ql-stroke" x1="7" y1="8" x2="7" y2="10"></line>
      <line class="ql-stroke" x1="11" y1="8" x2="11" y2="10"></line>
      <line class="ql-stroke" x1="7" y1="13" x2="7" y2="15"></line>
      <line class="ql-stroke" x1="11" y1="13" x2="11" y2="15"></line>
    </svg>`;
  }
}

export { HierarchicalList };
export default HierarchicalList;
