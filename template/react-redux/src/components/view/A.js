/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-12-16 11:10
 */

import React, {Component} from 'react';
function A(WrappedComponent) {
    return class A extends Component {
        render() {
            return (
                <div>
                    我是A组件
                    <br/>
                    <WrappedComponent/>
                </div>
            )
        }
    }
}
export default A;