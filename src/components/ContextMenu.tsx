import React, { useRef, useEffect } from 'react';
import { useMenuStore } from '../stores/menuStore';
import './ContextMenu.css';

interface ContextMenuItem {
    label: string;
    action: () => void;
    shortcut?: string;
    disabled?: boolean;
    separator?: boolean;
}

interface ContextMenuProps {
    visible: boolean;
    x: number;
    y: number;
    items: ContextMenuItem[];
    onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
    visible,
    x,
    y,
    items,
    onClose
}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const { closeAllMenus } = useMenuStore();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (visible) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
            closeAllMenus();
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [visible, onClose, closeAllMenus]);

    useEffect(() => {
        // Adjust position if menu goes off screen
        if (visible && menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            const adjustedX = rect.right > window.innerWidth ? x - rect.width : x;
            const adjustedY = rect.bottom > window.innerHeight ? y - rect.height : y;

            if (adjustedX !== x || adjustedY !== y) {
                menuRef.current.style.left = `${adjustedX}px`;
                menuRef.current.style.top = `${adjustedY}px`;
            }
        }
    }, [visible, x, y]);

    if (!visible) {
        return null;
    }

    const handleItemClick = (item: ContextMenuItem) => {
        if (!item.disabled && !item.separator) {
            item.action();
            onClose();
        }
    };

    return (
        <div
            ref={menuRef}
            className="context-menu"
            style={{ left: x, top: y }}
            role="menu"
        >
            {items.map((item, index) => {
                if (item.separator) {
                    return <div key={`separator-${index}`} className="context-menu-separator" />;
                }

                return (
                    <div
                        key={item.label}
                        className={`context-menu-item ${item.disabled ? 'disabled' : ''}`}
                        onClick={() => handleItemClick(item)}
                        role="menuitem"
                    >
                        <span className="context-menu-label">{item.label}</span>
                        {item.shortcut && (
                            <span className="context-menu-shortcut">{item.shortcut}</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};