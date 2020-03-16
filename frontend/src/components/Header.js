import React from 'react';
import {Navbar} from 'react-bootstrap';

import './css/Header.css'

export default function Header(props) {
    return (
        <Navbar>
            <Navbar.Brand href={'/'}>
                <span>Tracker</span>
            </Navbar.Brand>
        </Navbar>
    )
}