import React, {useEffect, useState} from 'react';

import Graph from "./Graph";
import ActiveWindows from "./ActiveWindows";
import Filter from "./Filter";
import {formatRequestParams, formatUsageData, unformatTime} from "../../utils";
import {mockUsageData} from '../../_mockData';

import './css/UserInfoPage.css';

// todo remove mock data on prod

function UserInfoPage(props){
    let _hasRangeChanged = false;

    const rangeChanged = (value) => {
        _hasRangeChanged = value;
    };

    const handlesRef = React.createRef();

    const [timeRange, setTimeRange] = useState({
        from: 0,
        to: 1439
    });

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const [usageData, setUsageData] = useState({
        cpu: [],
        mem: []
    });

    const [activeWindows, setActiveWindows] = useState([]);

    const handleSliderChange = () => {
        const from = handlesRef.current.handlesRefs['0'].props.value;
        const to = handlesRef.current.handlesRefs['1'].props.value;

        setTimeRange({
            from,
            to
        });
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleButtonClick = (e) => {
        e.preventDefault();

        if(_hasRangeChanged){
            // todo replace fetchUsageDataMock() with fetchUsageData()
            fetchUsageData(timeRange);
            fetchActiveWindows(timeRange);
            rangeChanged(false);
        }
    };

    const fetchUsageData = ({from, to}) => {
        const {formattedFrom, formattedTo} = formatRequestParams(date, {from, to});
        const requestStr = `http://51.158.177.205:1488/api/v1/resource-usages/TESTID2?from=${formattedFrom}&to=${formattedTo}`;

        // todo replace with real api url
        fetch(requestStr)
            .then(r => r.json())
            .then(usageData => formatUsageData(usageData))
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

    const fetchActiveWindows = ({from, to}) => {
        const {formattedFrom, formattedTo} = formatRequestParams(date, {from, to});
        const requestStr = `http://51.158.177.205:1488/api/v1/active-windows/TESTID2?from=${formattedFrom}&to=${formattedTo}`;

        // todo replace with real api url
        fetch(requestStr)
            .then(r => r.json())
            .then(activeWindows => setActiveWindows(activeWindows))
    };

    useEffect(() => {
        // todo replace _fetchUsageDataMock() with fetchUsageData()
        fetchUsageData(timeRange);
        // todo replace _fetchActiveWindowsMock() with fetchActiveWindows()
        fetchActiveWindows(timeRange);
    }, []);

    useEffect(() => {
        rangeChanged(true);
    }, [date]);

    return (
        <div id={'info-page'}>
            <Graph usageData={usageData}/>
            <Filter sliderChangeHandler={handleSliderChange}
                    buttonClickHandler={handleButtonClick}
                    timeRange={timeRange}
                    rangeChanged={rangeChanged}
                    handlesRefs={handlesRef}
                    date={date}
                    dateChangeHandler={handleDateChange}/>
            <ActiveWindows windows={activeWindows}/>
        </div>
    );


}

export default UserInfoPage;