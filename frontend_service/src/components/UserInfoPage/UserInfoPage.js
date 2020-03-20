import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import Graph from "./Graph";
import ActiveWindows from "./ActiveWindows";
import Filter from "./Filter";
import {formatRequestParams, formatUsageData, dataTypes, getFullDate} from "../../utils";

import './css/UserInfoPage.css';

function UserInfoPage(props){
    let _hasRangeChanged = false;

    const rangeChanged = (value) => {
        _hasRangeChanged = value;
    };

    const {param} = useParams();
    const hwId = param.split('_')[0];
    const userId = param.split('_')[1];

    const handlesRef = React.createRef();

    const [timeRange, setTimeRange] = useState({
        from: 0,
        to: 1439
    });
    const [date, setDate] = useState(getFullDate());
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
            fetchUserData(dataTypes.RESOURCE_USAGES, usageData => setUsageData(formatUsageData(usageData)));
            fetchUserData(dataTypes.ACTIVE_WINDOWS, activeWindows => setActiveWindows(activeWindows));
            rangeChanged(false);
        }
    };

    const fetchUserData = async (dataType, callback) => {
        let requestStr = '';

        if(dataType === dataTypes.USERNAME) requestStr = `http://51.158.177.205:1488/api/v1/${dataType}/${userId}`;
        if(dataType === dataTypes.ACTIVE_WINDOWS || dataType === dataTypes.RESOURCE_USAGES){
            const {formattedFrom, formattedTo} = formatRequestParams(date, timeRange);
            requestStr = `http://51.158.177.205:1488/api/v1/${dataType}/${hwId}?from=${formattedFrom}&to=${formattedTo}`;
        }

        try {
            const response = await fetch(requestStr);
            const userData = await response.json();

            if(userData.error) {
                props.handleServerError(userData.error, 5000);
                return;
            }

            callback(userData);

        } catch (e) {
            props.handleServerError('Server is not responding!');
        }
    };

    useEffect(() => {
        fetchUserData(dataTypes.USERNAME, userData => {document.title = `Tracker | ${userData.username}`});
        fetchUserData(dataTypes.RESOURCE_USAGES, usageData => setUsageData(formatUsageData(usageData)));
        fetchUserData(dataTypes.ACTIVE_WINDOWS, activeWindows => setActiveWindows(activeWindows));
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