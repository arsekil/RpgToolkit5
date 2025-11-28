import { create } from 'zustand';

export interface MenuState {
    // Menu visibility states
    openMenus: Record<string, boolean>;

    // Menu actions
    openMenu: (menuId: string) => void;
    closeMenu: (menuId: string) => void;
    closeAllMenus: () => void;
    toggleMenu: (menuId: string) => void;

    // Theme state
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;

    // Keyboard shortcuts
    shortcuts: Record<string, string>;
    setShortcut: (action: string, shortcut: string) => void;
}

export const useMenuStore = create<MenuState>((set, get) => ({
    // Initial state
    openMenus: {},
    theme: 'dark',
    shortcuts: {
        'newProject': 'Ctrl+N',
        'openProject': 'Ctrl+O',
        'saveProject': 'Ctrl+S',
        'undo': 'Ctrl+Z',
        'redo': 'Ctrl+Y',
        'cut': 'Ctrl+X',
        'copy': 'Ctrl+C',
        'paste': 'Ctrl+V',
    },

    // Menu actions
    openMenu: (menuId: string) => {
        set((state) => ({
            openMenus: {
                ...state.openMenus,
                [menuId]: true,
            },
        }));
    },

    closeMenu: (menuId: string) => {
        set((state) => ({
            openMenus: {
                ...state.openMenus,
                [menuId]: false,
            },
        }));
    },

    closeAllMenus: () => {
        set({ openMenus: {} });
    },

    toggleMenu: (menuId: string) => {
        const currentState = get().openMenus[menuId] || false;
        set((state) => ({
            openMenus: {
                ...state.openMenus,
                [menuId]: !currentState,
            },
        }));
    },

    // Theme actions
    setTheme: (theme: 'light' | 'dark') => {
        set({ theme });

        // Update CSS variables for theme
        const root = document.documentElement;
        if (theme === 'light') {
            root.style.setProperty('--menu-background', '#ffffff');
            root.style.setProperty('--menu-text', '#333333');
            root.style.setProperty('--menu-border', '#e0e0e0');
            root.style.setProperty('--menu-hover', '#f5f5f5');
            root.style.setProperty('--dropdown-background', '#ffffff');
            root.style.setProperty('--dropdown-border', '#e0e0e0');
            root.style.setProperty('--dropdown-hover', '#f5f5f5');
            root.style.setProperty('--dropdown-text', '#333333');
            root.style.setProperty('--background-color', '#fafafa');
            root.style.setProperty('--text-color', '#333333');
            root.style.setProperty('--secondary-text-color', '#666666');
        } else {
            root.style.setProperty('--menu-background', '#2d3748');
            root.style.setProperty('--menu-text', '#e2e8f0');
            root.style.setProperty('--menu-border', '#4a5568');
            root.style.setProperty('--menu-hover', '#4a5568');
            root.style.setProperty('--dropdown-background', '#2d3748');
            root.style.setProperty('--dropdown-border', '#4a5568');
            root.style.setProperty('--dropdown-hover', '#4a5568');
            root.style.setProperty('--dropdown-text', '#e2e8f0');
            root.style.setProperty('--background-color', '#1a202c');
            root.style.setProperty('--text-color', '#e2e8f0');
            root.style.setProperty('--secondary-text-color', '#a0aec0');
        }
    },

    // Shortcut actions
    setShortcut: (action: string, shortcut: string) => {
        set((state) => ({
            shortcuts: {
                ...state.shortcuts,
                [action]: shortcut,
            },
        }));
    },
}));