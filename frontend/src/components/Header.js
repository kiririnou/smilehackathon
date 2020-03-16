import React from 'react';
import {Navbar} from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

import './css/Header.css'

export default function Header(props) {
    return (
        <Navbar>
            <Navbar.Brand href={'/'}>
                <span>Tracker</span>
            </Navbar.Brand>
            <div className="theme-picker">
                <span style={{marginRight: '1rem', color: !props.darkTheme ? '#f8f9fa' : '#AFBDD1'}}>Theme</span>
                <BootstrapSwitchButton checked={!props.darkTheme}
                                       onstyle="light"
                                       offstyle="dark"
                                       onlabel={'light'}
                                       offlabel={'dark'}
                                       style={'theme-button'}
                                       onChange={props.handleThemeSwitch}
                />
            </div>

        </Navbar>
    )
}