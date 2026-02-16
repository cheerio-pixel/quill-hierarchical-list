# Quill Hierarchical List

A Quill.js plugin that adds hierarchical ordered list numbering (1, 1.1, 1.1.1, etc.) to the editor.

## Features

- Hierarchical numbering: 1 → 1.1 → 1.1.1
- Up to 10 levels of nesting
- Works with Quill's built-in Tab/Shift+Tab indentation
- Number alignment on the left edge
- Custom toolbar icon

## Installation

### Via CDN

```html
<!-- Include Quill CSS -->
<link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet">

<!-- Include Quill JS -->
<script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>

<!-- Include Hierarchical List CSS -->
<link href="quill-hierarchical-list.css" rel="stylesheet">

<!-- Include Hierarchical List JS -->
<script src="quill-hierarchical-list.js"></script>
```


## Usage

```javascript
const quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: {
      container: [
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'hierarchical' }],
        ['indent', 'outdent']
      ]
    }
  }
});
```

### Toolbar Button

The plugin adds a `hierarchical` option to the list dropdown. You can add it to your toolbar:

```javascript
toolbar: {
  container: [
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'hierarchical' }],
    ['indent', 'outdent']
  ]
}
```

### Keyboard Shortcuts

- **Tab** - Indent (increase level)
- **Shift+Tab** - Outdent (decrease level)

## Example Output

```
1. First item
1.1 Nested item
1.1.1 Deep nested
1.1.2 Another deep nested
1.2 Another nested
2. Second top-level item
2.1 Another nested item
3. Third top-level item
```

## Browser Support

- Chrome
- Firefox
- Safari
- Edge

## License

MIT
