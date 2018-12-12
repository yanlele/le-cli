/**
 * create by yanle
 * create time 2018/12/11 下午4:30
 */

export const GET_USER_INFO_REQUEST = "userInfo/GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "userInfo/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "userInfo/GET_USER_INFO_FAIL";

import {fetch} from '../../common/api';

/*action*/
export function getUserInfo() {
    return function (dispatch) {
        dispatch(getUserInfoRequest());
        fetch('user-info')
            .then(function (data) {
                dispatch(getUserInfoSuccess(data.data));
            })
            .catch(function (err) {
                dispatch(getUserInfoFail())
            });
    }
}


/*action Mapper*/
function getUserInfoRequest() {
    return {
        type: GET_USER_INFO_REQUEST
    }
}

function getUserInfoSuccess(userInfo) {
    return {
        type: GET_USER_INFO_SUCCESS,
        userInfo: userInfo
    }
}

function getUserInfoFail() {
    return {
        type: GET_USER_INFO_FAIL
    }
}