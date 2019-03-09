import * as React from 'react';
import {connect} from 'react-redux';
import Counter from 'components/Counter';
import CountTimer from 'components/CountTimer';
import {counterConst} from '../../reducers/counter';
import {countTimerConst} from '../../reducers/countTimer';

const {
  INCREMENT,
  DECREMENT,
  INCREMENT_ASYNC,
  INCREMENT_ASYNC_ONCE,
} = counterConst;
const {CT_SHOW_REQUEST} = countTimerConst;

type CountTimerObj = {
  show: boolean,
};

export interface CounterContainerCheckProps {
  onDecrement: (event: any) => void,
  onIncrement: (event: any) => void,
  onIncrementAsync: (event: any) => void,
  onIncrementAsyncOnce: (event: any) => void,
  onProxyWeather: (event: any) => void,
  onShowCountTimer: () => void,
  counter: number,
  countTimer: CountTimerObj,
}

type StateProps = {
  counter: number,
  countTimer: object,
};
const mapStateToProps = (state: StateProps) => ({
  counter: state.counter,
  countTimer: state.countTimer,
});

const mapDispatchToProps = (dispatch: Function) => ({
  onIncrement() {
    dispatch({
      type: INCREMENT,
    });
  },
  onDecrement() {
    dispatch({
      type: DECREMENT,
    });
  },
  onIncrementAsync() {
    console.log('onIncrementAsync 延时1秒增加');
    dispatch({
      type: INCREMENT_ASYNC,
      payload: {
        name: 'yanle',
        age: 27,
      },
    });
  },
  onIncrementAsyncOnce() {
    console.log('onIncrementAsyncOnce 同时多次触发仅执行最后一次');
    dispatch({
      type: INCREMENT_ASYNC_ONCE,
    });
  },
  onShowCountTimer() {
    console.log('onShowCountTimer 执行任务');
    dispatch({
      type: CT_SHOW_REQUEST,
    });
  },
  onProxyWeather() {
    dispatch({
      type: 'GET_WEATHER_PROXY',
    });
  },
});

class CounterContainer extends React.Component<CounterContainerCheckProps, {}> {
  render() {
    const {
      onIncrement,
      onDecrement,
      onIncrementAsync,
      onIncrementAsyncOnce,
      onProxyWeather,
      onShowCountTimer,
      counter,
      countTimer,
    } = this.props;
    return (
        <div>
          <Counter {...{
            onIncrement, onDecrement, onIncrementAsync, onIncrementAsyncOnce, counter, onProxyWeather,
          }} />
          <button onClick={onShowCountTimer}>点击显示</button>
          <CountTimer show={countTimer.show}/>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer as any);
