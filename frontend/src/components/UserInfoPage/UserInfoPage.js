import React, {useEffect, useState} from 'react';

import Graph from "./Graph";
import ActiveWindows from "./ActiveWindows";
import Filter from "./Filter";
import {formatUsageData, unformatTime} from "../../utils";
import {mockUsageData} from '../../_mockData';

import './css/UserInfoPage.css';


function UserInfoPage(props){
    let _hasRangeChanged = false;
    const handles = React.createRef();

    // todo remove mock data on prod

    const [timeRange, setTimeRange] = useState({
        from: 0,
        to: 1440
    });

    const [usageData, setUsageData] = useState({
        cpu: [],
        mem: []
    });

    const [activeWindows, setActiveWindows] = useState([]);

    const handleSliderChange = () => {
        const from = handles.current.handlesRefs['0'].props.value;
        const to = handles.current.handlesRefs['1'].props.value;

        setTimeRange({
            from,
            to
        });
    };

    const rangeChanged = (value) => {
        _hasRangeChanged = value;
    };

    const handleButtonClick = (e) => {
        e.preventDefault();

        if(_hasRangeChanged){
            _fetchUsageDataMock(timeRange);
            rangeChanged(false);
        }
    };

    const fetchUsageData = ({from, to}) => {
        // todo replace with real api url
        fetch('api_url', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(usageData => setUsageData(usageData))
    };

    const _fetchUsageDataMock = ({from, to}) => {
        const fetchedMock = mockUsageData.filter(data => {
            const time = unformatTime(data[0].split(' ')[1]);
            return (time >= from) && (time <= to);
        });

        const usageData = formatUsageData(fetchedMock);
        setUsageData(usageData);
    };

    const fetchActiveWindows = () => {

    };

    const _fetchActiveWindowsMock = () => {

    };

    useEffect(() => {
        // todo replace fetchUsageDataMock() with fetchUsageData()
        _fetchUsageDataMock(timeRange);
        // todo replace _fetchActiveWindowsMock() with fetchActiveWindows()
        _fetchActiveWindowsMock();
    }, []);

    return (
        <div id={'info-page'}>
            <Graph usageData={usageData}/>
            <Filter sliderChangeHandler={handleSliderChange}
                    buttonClickHandler={handleButtonClick}
                    timeRange={timeRange}
                    rangeChanged={rangeChanged}
                    handlesRefs={handles}/>
            <ActiveWindows/>
        </div>
    );


}

export default UserInfoPage;