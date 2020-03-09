import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Graph from "./Graph";
import ActiveWindows from "./ActiveWindows";
import Filter from "./Filter";

import './css/UserInfoPage.css';

function UserInfoPage(props){
    return (
        <div id={'info-page'}>
            <Graph/>
            <Filter/>
            <ActiveWindows/>
        </div>
    );
}

export default UserInfoPage;