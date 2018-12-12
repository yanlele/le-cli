/**
 * create by yanle
 * create time 2018/12/12 下午5:46
 */

let Mock = require('mockjs');

var Random = Mock.Random;

module.exports = function () {
    let data = {};
    data.user = {
        'name': Random.cname(),
        'intro': Random.word(20)
    };
    data.userInfo = {
        status: 200,
        success: true,
        msg: '请求成功',
        data: {
            'name': 'yanle',
            age: 25,
            info: '2312323rffdvdfv'
        }
    };
    return data;
};