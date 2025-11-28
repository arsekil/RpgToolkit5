import React, { useEffect, useState } from 'react';
import { MenuBar } from './MenuBar';
import { ContextMenu } from './ContextMenu';
import { useMenuStore } from '../stores/menuStore';
import './App.css';

export const App: React.FC = () => {
    const { theme, setTheme, shortcuts } = useMenuStore();
    const [contextMenu, setContextMenu] = useState<{
        visible: boolean;
        x: number;
        y: number;
        items: any[];
    }>({
        visible: false,
        x: 0,
        y: 0,
        items: []
    });

    useEffect(() => {
        // Initialize theme on mount
        setTheme(theme);

        // Global keyboard shortcuts
        const handleKeyDown = (event: KeyboardEvent) => {
            // Alt key to focus menu bar
            if (event.altKey) {
                const menuMap: Record<string, string> = {
                    'f': 'file',
                    'e': 'edit',
                    'v': 'view',
                    'p': 'project',
                    't': 'tools',
                    'h': 'help'
                };

                const menuKey = menuMap[event.key.toLowerCase()];
                if (menuKey) {
                    event.preventDefault();
                    // Focus the menu item
                    const menuElement = document.querySelector(`[data-menu-id="${menuKey}"]`);
                    if (menuElement) {
                        (menuElement as HTMLElement).focus();
                    }
                }
            }

            // Ctrl+ shortcuts for actions
            if (event.ctrlKey) {
                const actionMap: Record<string, () => void> = {
                    'n': () => console.log('New Project'),
                    'o': () => console.log('Open Project'),
                    's': () => console.log('Save Project'),
                    'z': () => console.log('Undo'),
                    'y': () => console.log('Redo'),
                    'x': () => console.log('Cut'),
                    'c': () => console.log('Copy'),
                    'v': () => console.log('Paste'),
                };

                const action = actionMap[event.key.toLowerCase()];
                if (action) {
                    event.preventDefault();
                    action();
                }
            }
        };

        // Global context menu
        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();

            const contextItems = [
                { label: 'Cut', action: () => console.log('Context Cut'), shortcut: 'Ctrl+X' },
                { label: 'Copy', action: () => console.log('Context Copy'), shortcut: 'Ctrl+C' },
                { label: 'Paste', action: () => console.log('Context Paste'), shortcut: 'Ctrl+V' },
                { separator: true },
                { label: 'Select All', action: () => console.log('Select All'), shortcut: 'Ctrl+A' },
                { separator: true },
                { label: 'Properties', action: () => console.log('Properties') },
            ];

            setContextMenu({
                visible: true,
                x: event.clientX,
                y: event.clientY,
                items: contextItems
            });
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, [theme, setTheme]);

    const closeContextMenu = () => {
        setContextMenu(prev => ({ ...prev, visible: false }));
    };

    return (
        <div className="app" data-theme={theme}>
            <MenuBar />
            <main className="app-content">
                <h1>RPG Toolkit 5</h1>
                <p>Welcome to the modern RPG development toolkit</p>

                <div style={{ marginTop: '20px' }}>
                    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
                    </button>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <h3>Keyboard Shortcuts:</h3>
                    <ul>
                        <li><strong>Alt + F</strong> - File Menu</li>
                        <li><strong>Alt + E</strong> - Edit Menu</li>
                        <li><strong>Alt + V</strong> - View Menu</li>
                        <li><strong>Alt + P</strong> - Project Menu</li>
                        <li><strong>Alt + T</strong> - Tools Menu</li>
                        <li><strong>Alt + H</strong> - Help Menu</li>
                        <li><strong>Ctrl + N</strong> - New Project</li>
                        <li><strong>Ctrl + O</strong> - Open Project</li>
                        <li><strong>Ctrl + S</strong> - Save Project</li>
                        <li><strong>Right Click</strong> - Context Menu</li>
                    </ul>
                </div>
            </main>

            <ContextMenu
                visible={contextMenu.visible}
                x={contextMenu.x}
                y={contextMenu.y}
                items={contextMenu.items}
                onClose={closeContextMenu}
            />
        </div>
    );
};