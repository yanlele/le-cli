/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-12-16 11:10
 */

import React, {Component} from 'react';
import B from 'components/view/B';
import C from 'components/view/C';

class HOComponent extends Component {
    render() {
        return (
            <div>
                <h2>我是高阶组件</h2>
                <B />
                <hr/>
                <C />
            </div>
        )
    }
}
export default HOComponent;