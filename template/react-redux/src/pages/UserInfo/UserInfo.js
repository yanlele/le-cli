/**
 * create by yanle
 * create time 2018/12/11 下午4:28
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from "../../redux/actions/userInfo";

let mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
};

// 装饰器模式
@connect(
    //你要的states什么属性放到props里面
    //     state => ({num: state}),
    mapStateToProps,
    //你要的什么方法，也放到props里面，而且自动dispatch
    {getUserInfo}
)
class UserInfo extends Component {
    render() {
        const {userInfo, isLoading, errorMsg} = this.props.userInfo;
        console.log(this.props.userInfo);
        return (
            <div>
                {
                    isLoading ? '信息加载中。。。。。。' :
                        (
                            errorMsg ? errorMsg :
                                <div>
                                    <p>用户信息</p>
                                    <p>用户名： {userInfo.name}</p>
                                    <p>介绍： {userInfo.info}</p>
                                </div>
                        )
                }
                <button onClick={() => this.props.getUserInfo()}>请求用户信息</button>
            </div>
        )
    }
}

export default UserInfo;

