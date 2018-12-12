/**
 * create by yanle
 * create time 2018/12/11 下午4:27
 */

import React, {Component} from 'react';
import './Page1.css';
import './Page1.less';
import img1 from './img/testimg.jpeg';

class Page1 extends Component {
    render() {
        return (
            <div>
                this is page1
                <p className="page-box">
                    12312312313
                </p>
                <p className="less-style">
                    ldhsvsldvnsldkvnwl
                </p>
                <img src={img1} alt=""/>

                <i className="icon">
                </i>
            </div>
        )
    }
}

export default Page1;