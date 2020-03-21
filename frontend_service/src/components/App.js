import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import "regenerator-runtime/runtime.js";
import Toast from "react-bootstrap/Toast";

import Header from "./Header";
import MainPage from "./MainPage/MainPage";
import UserInfoPage from "./UserInfoPage/UserInfoPage";

import './static/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './static/css/dark-mode/style.scss';


export default function (props) {
    const [show, setShow] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [delay, setDelay] = useState(3000);
    const [darkTheme, setDarkTheme] = useState(false);

    const handleServerError = (errorText, delay=3000) => {
        setShow(true);
        setErrorText(errorText);
        setDelay(delay);
    };

    const handleThemeSwitch = () => {
        setDarkTheme(!darkTheme);
    };

    useEffect(() => {
        const storedValue = localStorage.getItem('darkTheme');
        if(storedValue) setDarkTheme(JSON.parse(storedValue).darkTheme);
    }, []);

    useEffect(() => {
        localStorage.setItem('darkTheme', JSON.stringify({darkTheme}));
        document.body.className = darkTheme ? 'dark-mode-body' : '';
    }, [darkTheme]);

    return (
        <div id={'app'} className={darkTheme ? 'dark-mode' : ''}>
            <Header handleThemeSwitch={handleThemeSwitch} darkTheme={darkTheme}/>
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
                <Route path={'/user/:param'}>
                    <UserInfoPage handleServerError={handleServerError}/>
                </Route>
            </Switch>
        </div>
    )
}