/**
 * create by yanle
 * create time 2018/12/12 下午5:17
 */
import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import getRouter from 'router/router';


class App extends Component {
    render() {
        return (
            <div>
                <Nav/>
                {getRouter()}
            </div>
        )
    }
}

export default App;