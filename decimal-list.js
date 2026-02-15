import Quill from 'quill';

const Module = Quill.import('core/module');

class DecimalList extends Module {
  constructor(quill, options) {
    super(quill, options);
    this.name = 'DecimalList';
    this.pattern = /^\d+\.\d+/;
    
    quill.on('text-change', this.handleTextChange.bind(this));
    quill.on('selection-change', this.handleSelectionChange.bind(this));
  }

  handleTextChange() {
    setTimeout(() => {
      this.ensureDecimalLists();
    }, 10);
  }

  handleSelectionChange(range) {
    if (range) {
      this.ensureDecimalLists();
    }
  }

  ensureDecimalLists() {
    const editor = this.quill.root;
    const ols = editor.querySelectorAll('ol.decimal-list');
    ols.forEach(ol => {
      const items = ol.querySelectorAll(':scope > li');
      items.forEach(li => {
        li.classList.add('decimal-list-item');
      });
    });
  }

  applyDecimalList() {
    const range = this.quill.getSelection();
    if (!range) return false;

    this.quill.formatLine(range.index, range.length, 'list', 'ordered');

    setTimeout(() => {
      const editor = this.quill.root;
      const ols = editor.querySelectorAll('ol');
      ols.forEach(ol => {
        if (ol.tagName === 'OL') {
          ol.classList.add('decimal-list');
        }
      });
      this.ensureDecimalLists();
    }, 10);

    return true;
  }
}

DecimalList.moduleName = 'decimalList';

Quill.register('modules/decimalList', DecimalList);

export default DecimalList;
