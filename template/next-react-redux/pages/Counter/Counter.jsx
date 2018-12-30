/**
 * create by yanle
 * create time 2018/12/11 下午4:26
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {increment, decrement, reset} from '../../redux/actions/counter';

const mapStateToProps = (state)=> {
    return {
        counter: state.counter
    }
};
class Counter extends Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
    }

    render() {
        return (
            <div>
                <p>当前技术为store 里面的计数: {this.props.counter.count}</p>
                <button onClick={this.handleAdd}>增加</button>
                <button onClick={()=> {
                    let {dispatch} = this.props;
                    dispatch(decrement())
                    // this.props.decrement();
                }}>减少</button>
                <button onClick={()=> {
                    let {dispatch} = this.props;
                    dispatch(reset())
                    // this.props.reset();
                }}>清空</button>
            </div>
        )
    }

    handleAdd() {
        // 这样是不行的， 如果想要这样用， 还需要一个react-thunk
        let {dispatch} = this.props;
        dispatch(increment())
    }
}

export default connect(mapStateToProps)(Counter);