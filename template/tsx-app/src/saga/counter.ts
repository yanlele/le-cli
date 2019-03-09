import {
  put,
  takeEvery,
  takeLatest,
  all,
  delay,
} from 'redux-saga/effects';
import API from "../server";
import {counterConst} from "../reducers/counter";

const {
  INCREMENT,
  INCREMENT_ASYNC,
  INCREMENT_ASYNC_ONCE,
} = counterConst;

export function* incrementAsync() {
  yield delay(1000);
  yield put({type: INCREMENT});
  let Promise = yield API.getSceneInfo(123);
  console.log(Promise);
}

function* watchIncrementAsyncSaga() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsync);
}

function* watchIncrementAsyncOnceSaga() {
  yield takeLatest(INCREMENT_ASYNC_ONCE, incrementAsync);
}

export default function* counterSaga() {
  yield all([
    watchIncrementAsyncOnceSaga(),
    watchIncrementAsyncSaga(),
  ]);
}
