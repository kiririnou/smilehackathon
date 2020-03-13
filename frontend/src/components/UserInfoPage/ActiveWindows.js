import React from 'react';

import Card from "react-bootstrap/Card";
import './css/ActiveWindows.css';

export default function ActiveWindows(props){
    function _formatUsageTime(dateString) {
        return new Date(dateString).toLocaleTimeString();
    }

    return (
        <Card id={'active-windows'}>
            <Card.Body>
                <Card.Title>
                    Active windows
                </Card.Title>
                <Card.Text>
                    <div id={'columns'}>
                        <span style={{width: '35%'}}>Time</span>
                        <span style={{width: '65%'}}>Application</span>
                    </div>
                    <hr/>
                    <div id="windows">
                        {
                            props.windows.map((window, idx) => {
                                return (
                                    <div className="window" key={idx}>
                                        <span className={'window-time'}>{_formatUsageTime(window[0])} - {_formatUsageTime(window[1])}</span>
                                        <span className={'window-title'} title={window[2]}>{window[2]}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}