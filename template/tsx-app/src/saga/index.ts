import {
    all,
} from 'redux-saga/effects';
import counter from './counter';
import countTime from './countTimer';

function* helloSaga() {
    yield console.log('hello saga');
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        counter(),
        countTime(),
    ]);
}
