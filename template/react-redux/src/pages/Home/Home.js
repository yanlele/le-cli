/**
 * create by yanle
 * create time 2018/12/11 下午4:26
 */

import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';


class Home extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
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
                <button onClick={this.handleClick}>自增</button>
            </div>
        )
    }

    handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }
}


export default Home;