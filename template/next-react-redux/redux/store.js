/**
 * create by yanle
 * create time 2018/12/11 下午4:29
 */

import {createStore, applyMiddleware} from 'redux';
import thunkMidWare from 'redux-thunk';

import combineReducers from './reducers';

// 当修改reducer代码的时候，页面会整个刷新，而不是局部刷新唉。
// 增加一段监听reducers变化，并替换的代码。
// if (module.hot) {
//     module.hot.accept("./reducers", () => {
//         const nextCombineReducers = require("./reducers").default;
//         store.replaceReducer(nextCombineReducers);
//     });
// }

let store = createStore(combineReducers, applyMiddleware(thunkMidWare));

export default store;