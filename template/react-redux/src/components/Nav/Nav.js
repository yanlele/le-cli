/**
 * create by yanle
 * create time 2018/12/12 下午5:20
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Nav extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to='/'>首页</Link>
                    </li>
                    <li>
                        <Link to='/page1'>Page1</Link>
                    </li>
                    <li>
                        <Link to='/counter'>Counter</Link>
                    </li>
                    <li>
                        <Link to='/userinfo'>UserInfo</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Nav;