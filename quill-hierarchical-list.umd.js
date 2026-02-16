/**
 * Quill Hierarchical List Plugin (UMD)
 * Adds hierarchical ordered list numbering (1, 1.1, 1.1.1, etc.) to Quill editor
 * 
 * Usage:
 *   <script src="quill-hierarchical-list.umd.js"></script>
 *   <script>
 *     Quill.register('modules/hierarchicalList', QuillHierarchicalList);
 *     const quill = new Quill('#editor', {
 *       modules: { hierarchicalList: true }
 *     });
 *   </script>
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.QuillHierarchicalList = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Pre-register icon when module is loaded (before Quill editor is created)
  // This ensures the icon is available for the toolbar
  if (typeof Quill !== 'undefined') {
    const icons = Quill.import('ui/icons');
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

  class HierarchicalList {
    static moduleName = 'hierarchicalList';

    constructor(quill, options = {}) {
      this.quill = quill;
      this.options = options;
      this.extendListItem();
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
  }

  return HierarchicalList;
}));
