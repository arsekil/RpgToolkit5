import React, { useRef, useEffect } from 'react';
import { useMenuStore } from '../stores/menuStore';
import './MenuItem.css';

interface MenuItemProps {
    label: string;
    children?: React.ReactNode;
    shortcut?: string;
    disabled?: boolean;
    menuId?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    label,
    children,
    shortcut,
    disabled = false,
    menuId = label.toLowerCase().replace(/\s+/g, '-')
}) => {
    const {
        openMenus,
        openMenu,
        closeMenu,
        closeAllMenus,
        shortcuts
    } = useMenuStore();

    const menuRef = useRef<HTMLDivElement>(null);
    const isOpen = openMenus[menuId] || false;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeMenu(menuId);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeMenu, menuId]);

    useEffect(() => {
        // Close other menus when this one opens
        if (isOpen) {
            Object.keys(openMenus).forEach(key => {
                if (key !== menuId && openMenus[key]) {
                    closeMenu(key);
                }
            });
        }
    }, [isOpen, openMenus, closeMenu]);

    const handleClick = () => {
        if (!disabled) {
            if (isOpen) {
                closeMenu(menuId);
            } else {
                openMenu(menuId);
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick();
        } else if (event.key === 'Escape') {
            closeMenu(menuId);
        }
    };

    // Get shortcut from store if not provided
    const actionShortcut = shortcut || shortcuts[menuId];

    return (
        <div className="menu-item-container" ref={menuRef} data-menu-id={menuId}>
            <div
                className={`menu-item-label ${disabled ? 'disabled' : ''}`}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span>{label}</span>
                {actionShortcut && <span className="shortcut">{actionShortcut}</span>}
            </div>
            {children && isOpen && (
                <div className="dropdown-content" role="menu">
                    {children}
                </div>
            )}
        </div>
    );
};