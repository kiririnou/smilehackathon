import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from "./Header";
import MainPage from "./MainPage/MainPage";
import UserInfoPage from "./UserInfoPage/UserInfoPage";

import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function (props) {
    return (
        <div id={'app'}>
            <Header/>
            <Switch>
                {/*<Route path={'/'}>*/}
                {/*    <MainPage/>*/}
                {/*</Route>*/}
                {/*<Route path={'/user/:id'}>*/}
                {/*    <UserInfoPage/>*/}
                {/*</Route>*/}
                <Route exact path={'/'} component={MainPage}/>
                <Route path={'/user/:userId'}>
                    <UserInfoPage/>
                </Route>
            </Switch>
        </div>
    )
}