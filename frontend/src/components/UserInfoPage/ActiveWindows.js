import React from 'react';

import Card from "react-bootstrap/Card";
import './css/ActiveWindows.css';

export default function ActiveWindows(props){
    return (
        <Card id={'active-windows'}>
            <Card.Body>
                <Card.Title>
                    Active windows
                </Card.Title>
                <Card.Text>
                    <div id={'columns'}>
                        <span style={{width: '30%'}}>Time</span>
                        <span style={{width: '70%'}}>Application</span>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}