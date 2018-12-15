/**
 * create by yanle
 * create time 2018/12/11 下午4:26
 */

import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';
import {Button} from 'antd';


class Home extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.state = {
            count: 0
        }
    }

    render() {
        return (
            <div>
                <Nav/>
                <hr/>
                this is home  ~~~~~<br/>
                当前计数： {this.state.count} <br/>
                <Button type="primary" onClick={this.handleClick}>自增</Button>
                <Button type="danger" onClick={this.handleDown}>自减</Button>
            </div>
        )
    }

    handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    handleDown() {
        this.setState({
            count: --this.state.count
        })
    }
}


export default Home;