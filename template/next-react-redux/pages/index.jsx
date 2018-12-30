/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-12-30 14:17
 */
import '../style/index.less';
import Head from 'next/head'
import Link from 'next/link'
import React, {Component} from 'react';
import {Button, message} from 'antd';
import { withRouter } from 'next/router'

class Index extends Component {
    constructor(props) {
        super(props);
        const {router} = this.props;
    }

    static async getInitialProps({req}) {
        // const res = await fetch('https://api.github.com/repos/zeit/next.js')
        // const json = await res.json()
        // return { stars: json.stargazers_count }
        return { stars:  123}
    }

    render() {
        const {router} = this.props;
        let str = 'yanlele';
        return (
            <div>
                <Head>
                    <title>My page title</title>
                </Head>
                <p>hello 123</p>
                <p className="test">{str}</p>
                <p>Hello World {this.props.stars}</p>

                <hr/>
                <Link href="/home/home">
                    <a target="_blank">here</a>
                </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={()=>router.push('/home/home')}>编程式跳转路由</Button>
            </div>
        )
    }
}

export default withRouter(Index);