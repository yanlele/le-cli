/**
 * create by yanle
 * create time 2018/12/11 下午4:20
 */

import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import store from './redux/store';
import {Provider} from 'react-redux';

import getRouter from 'router/router';

// 初始化
renderWithHotReload(getRouter());

// 模块热更新
if (module.hot) {
    module.hot.accept('./router/router', () => {
        const getRouter = require('./router/router').default;
        renderWithHotReload(getRouter());
    });
}

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                {RootElement}
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}