import * as Koa from "koa";

import * as views from "koa-views";
import * as json from "koa-json";
import * as onError from "koa-onerror";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logs-middleware";
import * as session from "koa-generic-session";
import * as redisStore from "koa-redis";
import config from "./config";
import * as path from "path";

import routing from './src/routes/routing'

const MAX_AGE: number = 12 * 60 * 60 * 1000;
const dirName: string = __dirname;

// 实例化app
const app: Koa = new Koa();

// 错误处理
onError(app);

// 配置参数
const redisConfig = {
    port: config.redis.PORT,
    host: config.redis.HOST,
    db: config.redis.DB,
    ttl: 1000 * 60 * 60,               // 失效时间
};

// 配置session 中间件
app.keys = ['keys', 'keyskeys'];            // redis cookies 签名，必须要
app.use(session({
    store: redisStore(redisConfig)
}));

// 解析body
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());

// 加载日志
app.use(logger({
    defaultPath: path.resolve(dirName, 'logs'),
    applicationName: 'app'
}));

// 设置静态模板目录
app.use(require('koa-static')(dirName + '/views'));


// 设置模板引擎
app.use(views(dirName + '/views', {
    extension: 'html'
}));

// 装在路由
// 初始化路由中间件
app.use(routing.routes()).use(routing.allowedMethods({
    throw: true
}));

export default app;