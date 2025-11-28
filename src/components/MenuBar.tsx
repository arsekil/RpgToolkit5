import React from 'react';
import { MenuItem } from './MenuItem';
import './MenuBar.css';

export const MenuBar: React.FC = () => {
    return (
        <nav className="menu-bar">
            <div className="menu-section">
                <MenuItem label="File" menuId="file">
                    <div className="dropdown-menu">
                        <div className="menu-item">New Project</div>
                        <div className="menu-item">Open Project</div>
                        <div className="menu-item">Save Project</div>
                        <div className="menu-separator"></div>
                        <div className="menu-item">Exit</div>
                    </div>
                </MenuItem>

                <MenuItem label="Edit" menuId="edit">
                    <div className="dropdown-menu">
                        <div className="menu-item">Undo</div>
                        <div className="menu-item">Redo</div>
                        <div className="menu-separator"></div>
                        <div className="menu-item">Cut</div>
                        <div className="menu-item">Copy</div>
                        <div className="menu-item">Paste</div>
                    </div>
                </MenuItem>

                <MenuItem label="View" menuId="view">
                    <div className="dropdown-menu">
                        <div className="menu-item">Zoom In</div>
                        <div className="menu-item">Zoom Out</div>
                        <div className="menu-item">Reset View</div>
                        <div className="menu-separator"></div>
                        <div className="menu-item">Show Grid</div>
                        <div className="menu-item">Show Rulers</div>
                    </div>
                </MenuItem>

                <MenuItem label="Project" menuId="project">
                    <div className="dropdown-menu">
                        <div className="menu-item">Database</div>
                        <div className="menu-item">Characters</div>
                        <div className="menu-item">Maps</div>
                        <div className="menu-item">Events</div>
                        <div className="menu-separator"></div>
                        <div className="menu-item">Game Settings</div>
                    </div>
                </MenuItem>

                <MenuItem label="Tools" menuId="tools">
                    <div className="dropdown-menu">
                        <div className="menu-item">Resource Manager</div>
                        <div className="menu-item">Script Editor</div>
                        <div className="menu-item">Map Editor</div>
                        <div className="menu-item">Animation Editor</div>
                        <div className="menu-separator"></div>
                        <div className="menu-item">Preferences</div>
                    </div>
                </MenuItem>

                <MenuItem label="Help" menuId="help">
                    <div className="dropdown-menu">
                        <div className="menu-item">Documentation</div>
                        <div className="menu-item">Tutorial</div>
                        <div className="menu-item">About</div>
                    </div>
                </MenuItem>
            </div>
        </nav>
    );
};