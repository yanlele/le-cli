# webpack构建 react 全家桶

整理构建项目遇到的一些问题和重要知识点儿

## webpack-dev-server
简单来说，webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务。

他的几个属性                          
- color（CLI only） console中打印彩色日志
- historyApiFallback 任意的404响应都被替代为index.html。有什么用呢？你现在运行
    npm start，然后打开浏览器，访问http://localhost:8080,然后点击Page1到链接http://localhost:8080/page1，
    然后刷新页面试试。是不是发现刷新后404了。为什么？dist文件夹里面并没有page1.html,当然会404了，所以我们需要配置
- historyApiFallback，让所有的404定位到index.html。
- host 指定一个host,默认是localhost。如果你希望服务器外部可以访问，指定如下：host: "0.0.0.0"。比如你用手机通过IP访问。
- hot 启用Webpack的模块热替换特性。关于热模块替换，我下一小节专门讲解一下。
- port 配置要监听的端口。默认就是我们现在使用的8080端口。
- proxy 代理。比如在 localhost:3000 上有后端服务的话，你可以这样启用代理：
    ```
        proxy: {
          "/api": "http://localhost:3000"
        }
    ```
- progress（CLI only） 将编译进度输出到控制台。

CLI ONLY的需要在命令行中配置                          
package.json                        
`"start": "webpack-dev-server --config webpack.dev.config.js --color --progress"`


## redux
通过action.js文件创建函数，可以创建action~                                
```js
/*action*/
export const INCREMENT = "counter/INCREMENT";
export const DECREMENT = "counter/DECREMENT";
export const RESET = "counter/RESET";
export function increment() {
    return {type: INCREMENT}
}
export function decrement() {
    return {type: DECREMENT}
}
export function reset() {
    return {type: RESET}
}
```

reducer是一个纯函数，接收action和旧的state,生成新的state.                           
```js
import {INCREMENT, DECREMENT, RESET} from '../actions/counter';
/*
* 初始化state
 */
const initState = {
    count: 0
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1
            };
        case DECREMENT:
            return {
                count: state.count - 1
            };
        case RESET:
            return {count: 0};
        default:
            return state
    }
}
```

一个项目有很多的reducers,我们要把他们整合到一起                    
```js
import counter from './reducers/counter';
export default function combineReducers(state = {}, action) {
    return {
        counter: counter(state.counter, action)
    }
}
```

到这里，我们必须再理解下一句话。                    
**reducer就是纯函数，接收state 和 action，然后返回一个新的 state。**                           
看看上面的代码，无论是combineReducers函数也好，还是reducer函数也好，都是接收state和action，
返回更新后的state。区别就是combineReducers函数是处理整棵树，reducer函数是处理树的某一点。

接下来，我们要创建一个store。                       
前面我们可以使用 action 来描述“发生了什么”，使用action创建函数来返回action。                   
还可以使用 reducers 来根据 action 更新 state 。                        
那我们如何提交action？提交的时候，怎么才能触发reducers呢？                        
store 就是把它们联系到一起的对象。store 有以下职责：                        
- 维持应用的 state；
- 提供 getState() 方法获取 state；
- 提供 dispatch(action) 触发reducers方法更新 state；
- 通过 subscribe(listener) 注册监听器;
- 通过 subscribe(listener) 返回的函数注销监听器。
```js
import {createStore} from 'redux';
import combineReducers from './reducers.js';
let store = createStore(combineReducers);
export default store;
```

接下来就可以做一个简单的测试了：
```js
import {increment, decrement, reset} from './actions/counter';
import store from './store';

// 打印初始状态
console.log(store.getState());

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
);

// 发起一系列 action
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());

// 停止监听 state 更新
unsubscribe();
```

[具体示例可以看这里](https://github.com/yanlele/node-index/tree/master/book/01%E3%80%81react%E4%B8%93%E9%A2%98/02%E3%80%81redux/04%E3%80%81redux)

## react-redux
下一步，我们让Counter组件和Redux联合起来。使Counter能获得到Redux的state，并且能发射action。                     
当然我们可以使用刚才测试testRedux的方法，手动监听~手动引入store~但是这肯定很麻烦哦。

react-redux提供了一个方法 **connect**。
容器组件就是使用 store.subscribe() 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。
你可以手工来开发容器组件，但建议使用 React Redux 库的 connect() 方法来生成，
这个方法做了性能优化来避免很多不必要的重复渲染。

connect接收两个参数，一个mapStateToProps,就是把redux的state，转为组件的Props，还有一个参数是mapDispatchToprops,
就是把发射actions的方法，转为Props属性函数。
```js
import React, {Component} from 'react';
import {increment, decrement, reset} from 'actions/counter';

import {connect} from 'react-redux';

class Counter extends Component {
    render() {
        return (
            <div>
                <div>当前计数为{this.props.counter.count}</div>
                <button onClick={() => this.props.increment()}>自增
                </button>
                <button onClick={() => this.props.decrement()}>自减
                </button>
                <button onClick={() => this.props.reset()}>重置
                </button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => {
            dispatch(increment())
        },
        decrement: () => {
            dispatch(decrement())
        },
        reset: () => {
            dispatch(reset())
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```
其实我在项目开发中， 通常是没有用到第二个参数的， 我们可以直接在方法中通过props, 就可以拿到dispatch函数， 然后通过dispatch直接调用action 的方式；
这个地方有一个很坑人的地方， 如果绑定了第二个参数的方法， 那么props 里面就不必注入dispatch了， 如果不绑定props, 才会注入dispatch。
具体使用方式， 见node-index 项目react部分；                  

这里我们再缕下（可以读React 实践心得：[react-redux 之 connect 方法详解](http://taobaofed.org/blog/2016/08/18/react-redux-connect/)）
1、Provider组件是让所有的组件可以访问到store。不用手动去传。也不用手动去监听。                          
2、connect函数作用是从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。也传递dispatch(action)函数到props。                                 

## redux异步处理
想象一下我们调用一个异步get请求去后台请求数据：                           
- 请求开始的时候，界面转圈提示正在加载。isLoading置为true。
- 请求成功，显示数据。isLoading置为false,data填充数据。
- 请求失败，显示失败。isLoading置为false，显示错误信息。

dist/api/user.json：                     
```json
{
  "name": "brickspert",
  "intro": "please give me a star"
}
```

一声霹雳 redux-thunk 登场， 我们直接使用的redux 中 action 返回的实际上是一个对象； `{type: xxxx}` 这种样子的东西。
但是我现在用到的大多数业务逻辑中actionCreater 是这么写的：
```js
export function getUserInfo() {
    return function (dispatch) {
        dispatch(getUserInfoRequest());

        return fetch('http://localhost:8080/api/user.json')
            .then((response => {
                return response.json()
            }))
            .then((json) => {
                    dispatch(getUserInfoSuccess(json))
                }
            ).catch(
                () => {
                    dispatch(getUserInfoFail());
                }
            )
    }
}
```
直接调用action , 返回的是一个函数，而不是一个对象！                          
为了让action创建函数除了返回action对象外，还可以返回函数，我们需要引用redux-thunk。                       

这里涉及到redux中间件 `middleware`；                                                    
简单的说，中间件就是action在到达reducer，先经过中间件处理。
我们之前知道reducer能处理的action只有这样的{type:xxx}，所以我们使用中间件来处理
函数形式的action，把他们转为标准的action给reducer。这是redux-thunk的作用。                            
其中mapDispatchToProps可以使用react-redux提供的简单写法。
```js
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from "actions/userInfo";
class UserInfo extends Component {
    render() {
        const {userInfo, isLoading, errorMsg} = this.props.userInfo;
        return (
            <div>
                {
                    isLoading ? '请求信息中......' :
                        (
                            errorMsg ? errorMsg :
                                <div>
                                    <p>用户信息：</p>
                                    <p>用户名：{userInfo.name}</p>
                                    <p>介绍：{userInfo.intro}</p>
                                </div>
                        )
                }
                <button onClick={() => this.props.getUserInfo()}>请求用户信息</button>
            </div>
        )
    }
}
export default connect((state) => ({userInfo: state.userInfo}), {getUserInfo})(UserInfo);
```

这样做的原因是可以让我们能够返回一个函数，这个函数就可以处理一些列的逻辑功能和数据处理。 

使用方式：src/redux/store.js                                                        
```js
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import combineReducers from './reducers.js';
let store = createStore(combineReducers, applyMiddleware(thunkMiddleware));
export default store;
```


## 按需加载
我们现在看到，打包完后，所有页面只生成了一个build.js,当我们首屏加载的时候，就会很慢。因为他也下载了别的页面的js了哦。                                
如果每个页面都打包了自己单独的JS，在进入自己页面的时候才加载对应的js，那首屏加载就会快很多哦。                               
在 react-router 2.0时代， 按需加载需要用到的最关键的一个函数，就是 **require.ensure()** ，它是按需加载能够实现的核心。

在4.0版本，官方放弃了这种处理按需加载的方式，选择了一个更加简洁的处理方式: `bundle-loader`                     

## 缓存
我们网站上线了，用户第一次访问首页，下载了home.js，第二次访问又下载了home.js~                                  
这肯定不行呀，所以我们一般都会做一个缓存，用户下载一次home.js后，第二次就不下载了。                                   
有一天，我们更新了home.js，但是用户不知道呀，用户还是使用本地旧的home.js。出问题了~                                   
怎么解决？每次代码更新后，打包生成的名字不一样。比如第一次叫home.a.js，第二次叫home.b.js。                              

直接加hash就可以了：                    
```js
output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
}
```

## 生产坏境构建
开发环境(development)和生产环境(production)的构建目标差异很大。
在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)
或热模块替换(hot module replacement)能力的 source map 和 localhost server。
而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。
由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。

## 指定环境
许多 library 将通过与 process.env.NODE_ENV 环境变量关联，
以决定 library 中应该引用哪些内容。
例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。
其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，
从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量：
```js
module.exports = {
  plugins: [
       new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify('production')
           }
       })
  ]
}
```


## 优化缓存
刚才我们把[name].[hash].js变成[name].[chunkhash].js后，npm run build后，
发现app.xxx.js和vendor.xxx.js不一样了哦。

但是现在又有一个问题了。                        
你随便修改代码一处，例如Home.js，随便改变个字，你发现home.xxx.js名字变化的同时，
vendor.xxx.js名字也变了。这不行啊。这和没拆分不是一样一样了吗？我们本意是vendor.xxx.js
名字永久不变，一直缓存在用户本地的。~                     
官方文档推荐了一个插件HashedModuleIdsPlugin                                          
现在你打包，修改代码再试试，是不是名字不变啦？错了，现在打包，我发现名字还是变了，经过比对文档，我发现还要加一个runtime代码抽取，                            
```js
plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
    })
]
```
**注意，引入顺序在这里很重要。CommonsChunkPlugin 的 'vendor' 实例，必须在 'runtime' 实例之前引入。**


