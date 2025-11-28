# Menu System Documentation

## Overview
RPG Toolkit 5 features a modern, responsive menu system built with React and TypeScript, utilizing Zustand for state management.

## Components

### MenuBar
The main navigation bar at the top of the application.

**Features:**
- Hierarchical menu structure
- Keyboard navigation support (Alt + key)
- Theme-aware styling
- Responsive design

**Usage:**
```tsx
import { MenuBar } from './MenuBar';

<MenuBar />
```

### MenuItem
Individual menu items that can contain dropdown menus.

**Props:**
- `label`: Display text for the menu item
- `children`: Dropdown menu content
- `shortcut`: Keyboard shortcut display
- `disabled`: Disable the menu item
- `menuId`: Unique identifier for state management

**Features:**
- Click to toggle dropdown
- Keyboard navigation (Enter, Space, Escape)
- Automatic menu closing when clicking outside
- Integration with global shortcuts

### ContextMenu
Right-click context menu system.

**Props:**
- `visible`: Whether menu is shown
- `x`, `y`: Position coordinates
- `items`: Array of menu items
- `onClose`: Callback when menu should close

**Features:**
- Position adjustment to stay within viewport
- Keyboard shortcuts support
- Separator items support
- Disabled state handling

## State Management

### Menu Store (Zustand)
Global state management for menu system.

**State:**
```typescript
interface MenuState {
  openMenus: Record<string, boolean>;
  theme: 'light' | 'dark';
  shortcuts: Record<string, string>;
}
```

**Actions:**
- `openMenu(menuId)`: Open a specific menu
- `closeMenu(menuId)`: Close a specific menu
- `closeAllMenus()`: Close all menus
- `toggleMenu(menuId)`: Toggle menu state
- `setTheme(theme)`: Change application theme
- `setShortcut(action, shortcut)`: Set keyboard shortcut

## Keyboard Shortcuts

### Menu Navigation
- `Alt + F`: File menu
- `Alt + E`: Edit menu
- `Alt + V`: View menu
- `Alt + P`: Project menu
- `Alt + T`: Tools menu
- `Alt + H`: Help menu

### Action Shortcuts
- `Ctrl + N`: New Project
- `Ctrl + O`: Open Project
- `Ctrl + S`: Save Project
- `Ctrl + Z`: Undo
- `Ctrl + Y`: Redo
- `Ctrl + X`: Cut
- `Ctrl + C`: Copy
- `Ctrl + V`: Paste

### Context Menu
- `Right Click`: Open context menu
- `Escape`: Close context menu

## Styling

### CSS Variables
The menu system uses CSS custom properties for theming:

```css
:root {
  --menu-background: #2d3748;
  --menu-text: #e2e8f0;
  --menu-border: #4a5568;
  --menu-hover: #4a5568;
  --menu-disabled: #718096;
  --menu-focus: #3182ce;
  --menu-focus-border: #63b3ed;
  --menu-shortcut: #a0aec0;
  --dropdown-background: #2d3748;
  --dropdown-border: #4a5568;
  --dropdown-hover: #4a5568;
  --dropdown-text: #e2e8f0;
}
```

### Responsive Design
- Mobile-friendly touch targets
- Adaptive font sizes
- Viewport-aware positioning
- Flexible menu widths

## Accessibility

### ARIA Support
- `role="menu"` and `role="menuitem"` attributes
- `aria-haspopup` and `aria-expanded` states
- `aria-label` for screen readers
- Keyboard navigation support

### Focus Management
- Tab navigation through menu items
- Visual focus indicators
- Focus trapping within open menus
- Escape key handling

## Examples

### Basic Menu Bar
```tsx
<MenuBar />
```

### Custom Menu Item
```tsx
<MenuItem 
  label="Custom" 
  menuId="custom"
  shortcut="Ctrl+Shift+C"
>
  <div className="dropdown-menu">
    <div className="menu-item">Custom Action</div>
  </div>
</MenuItem>
```

### Context Menu Usage
```tsx
const [contextMenu, setContextMenu] = useState({
  visible: false,
  x: 0,
  y: 0,
  items: []
});

const handleContextMenu = (event: MouseEvent) => {
  event.preventDefault();
  setContextMenu({
    visible: true,
    x: event.clientX,
    y: event.clientY,
    items: [
      { label: 'Cut', action: () => console.log('Cut') },
      { label: 'Copy', action: () => console.log('Copy') },
      { separator: true },
      { label: 'Paste', action: () => console.log('Paste') }
    ]
  });
};

<ContextMenu
  visible={contextMenu.visible}
  x={contextMenu.x}
  y={contextMenu.y}
  items={contextMenu.items}
  onClose={() => setContextMenu(prev => ({ ...prev, visible: false }))}
/>
```

## Future Enhancements

### Planned Features
- Menu animation system
- Custom menu item components
- Plugin menu integration
- Advanced theming options
- Menu persistence
- Searchable menus
- Recent items tracking

### Performance Optimizations
- Virtual scrolling for large menus
- Menu item lazy loading
- Optimized re-rendering
- Memory management improvements