/**
 * create by yanle
 * create time 2018/12/11 下午4:31
 */

import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Bundle from './Bundle';

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/Page1';
import Counter from 'bundle-loader?lazy&name=counter!../pages/Counter/Counter';
import UserInfo from "bundle-loader?lazy&name=userInfo!../pages/UserInfo/UserInfo";

const Loading = function () {
    return <div>Loading...</div>
};

// 按需加载
const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);

const getRouter = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={createComponent(Home)}/>
                <Route path='/page1' component={createComponent(Page1)}/>
                <Route path='/counter' component={createComponent(Counter)}/>
                <Route path='/userinfo' component={createComponent(UserInfo)}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;