import React, {Component} from 'react';

import Graph from "./Graph";
import ActiveWindows from "./ActiveWindows";
import Filter from "./Filter";

import './css/UserInfoPage.css';
import {formatTime} from "../../utils";

class UserInfoPage extends Component{

    constructor(props) {
        super(props);

        this.state = {
            timeRanges: {
                from: '0:00',
                to: '24:00'
            }
        }
    }

    handleSliderChange = () => {
        const handlers = document.getElementsByClassName('rc-slider-handle');

        const from = handlers[0].getAttribute('aria-valuenow');
        const to = handlers[1].getAttribute('aria-valuenow');

        this.setState({
            timeRanges: {
                from: formatTime(from),
                to: formatTime(to)
            }
        });
    };

    render() {
        return (
            <div id={'info-page'}>
                <Graph/>
                <Filter sliderChangeHandler={this.handleSliderChange} timeRanges={this.state.timeRanges}/>
                <ActiveWindows/>
            </div>
        );
    }


}

export default UserInfoPage;