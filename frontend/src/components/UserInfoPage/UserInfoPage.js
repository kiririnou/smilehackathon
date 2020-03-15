import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import Graph from "./Graph";
import ActiveWindows from "./ActiveWindows";
import Filter from "./Filter";
import {formatRequestParams, formatUsageData, unformatTime, dataTypes} from "../../utils";
import {mockUsageData} from '../../_mockData';

import './css/UserInfoPage.css';

// todo remove mock data on prod

function UserInfoPage(props){
    let _hasRangeChanged = false;

    const rangeChanged = (value) => {
        _hasRangeChanged = value;
    };

    const {userId} = useParams();
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
            fetchUserData(timeRange, dataTypes.RESOURCE_USAGES, setUsageData);
            fetchUserData(timeRange, dataTypes.ACTIVE_WINDOWS, setActiveWindows);
            rangeChanged(false);
        }
    };

    const fetchUsageData = async ({from, to}) => {
        const {formattedFrom, formattedTo} = formatRequestParams(date, {from, to});
        const requestStr = `http://51.158.177.205:1488/api/v1/resource-usages/${userId}?from=${formattedFrom}&to=${formattedTo}`;

        try {
            const response = await fetch(requestStr);
            const usageData = await response.json();

            if(usageData.error || activeWindows.error) {
                props.handleServerError(usageData.error || activeWindows.error, 5000);
                return;
            }

            setUsageData(formatUsageData(usageData))
        } catch (e) {
            props.handleServerError('Server is not responding!');
        }
    };

    const fetchUserData = async ({from, to}, dataType, stateHandler) => {
        const {formattedFrom, formattedTo} = formatRequestParams(date, {from, to});
        const requestStr = `http://51.158.177.205:1488/api/v1/${dataType}/${userId}?from=${formattedFrom}&to=${formattedTo}`;

        try {
            const response = await fetch(requestStr);
            const userData = await response.json();

            if(userData.error) {
                props.handleServerError(userData.error, 5000);
                return;
            }

            if(dataType === dataTypes.RESOURCE_USAGES) stateHandler(formatUsageData(userData));
            if(dataType === dataTypes.ACTIVE_WINDOWS) stateHandler(userData);

        } catch (e) {
            props.handleServerError('Server is not responding!');
        }
    };

    const _fetchUsageDataMock = ({from, to}) => {
        const fetchedMock = mockUsageData.filter(data => {
            const time = unformatTime(data[0].split(' ')[1]);
            return (time >= from) && (time <= to);
        });

        const usageData = formatUsageData(fetchedMock);
        setUsageData(usageData);
    };

    const fetchActiveWindows = async ({from, to}) => {
        const {formattedFrom, formattedTo} = formatRequestParams(date, {from, to});
        const requestStr = `http://51.158.177.205:1488/api/v1/active-windows/${userId}?from=${formattedFrom}&to=${formattedTo}`;

        try {
            const response = await fetch(requestStr);
            const activeWindows = await response.json();

            if(usageData.error || activeWindows.error) {
                props.handleServerError(usageData.error || activeWindows.error, 5000);
                return;
            }

            setActiveWindows(activeWindows);
        } catch (e) {
            props.handleServerError('Server is not responding!');
        }
    };

    useEffect(() => {
        fetchUserData(timeRange, dataTypes.RESOURCE_USAGES, setUsageData);
        fetchUserData(timeRange, dataTypes.ACTIVE_WINDOWS, setActiveWindows);
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