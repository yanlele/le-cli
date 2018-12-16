/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-12-16 11:45
 */

import React, {Component} from 'react';



function D(WrappedComponent) {
    return class D extends Component {
        render() {
            return (
                <div>
                    我是高阶组件D ☆
                    <WrappedComponent />
                </div>
            )
        }
    }
}

export default D;