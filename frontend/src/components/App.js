import React from 'react';
import Header from "./Header";
import MainPage from "./MainPage/MainPage";

import './css/App.css';

export default function (props) {
    return (
        <div id={'app'}>
            <Header/>
            <MainPage/>
        </div>
    )
}