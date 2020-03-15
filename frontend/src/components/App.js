import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import "regenerator-runtime/runtime.js";

import Header from "./Header";
import MainPage from "./MainPage/MainPage";
import UserInfoPage from "./UserInfoPage/UserInfoPage";

import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from "react-bootstrap/Toast";

export default function (props) {
    const [show, setShow] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [delay, setDelay] = useState(3000);

    const handleServerError = (errorText, delay=3000) => {
        setShow(true);
        setErrorText(errorText);
        setDelay(delay);
    };

    return (
        <div id={'app'}>
            <Header/>
            <Toast onClose={() => setShow(false)}
                   show={show}
                   delay={delay}
                   autohide
                   style={{
                       fontSize: '1rem',
                       backgroundColor: 'rgba(255,100,100,0.48)'
                   }}
            >
                <Toast.Body>{errorText}</Toast.Body>
            </Toast>
            <Switch>
                <Route exact path={'/'} >
                    <MainPage handleServerError={handleServerError}/>
                </Route>
                <Route path={'/user/:userId'}>
                    <UserInfoPage handleServerError={handleServerError}/>
                </Route>
            </Switch>
        </div>
    )
}