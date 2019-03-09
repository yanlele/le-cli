import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

interface CountTimerCheckProps {
  show: boolean,
  time?: number,
}

const initialState = {
  show: false,
  time: 5,
};

type State = Readonly<typeof initialState>;

class CountTimer extends React.Component<CountTimerCheckProps, State> {

  static readonly defaultProps: CountTimerCheckProps = {
    show: false,
    time: 5,
  };

  state: State = initialState;

  timer: any = undefined;

  componentWillReceiveProps(nextProps: CountTimerCheckProps) {
    const { show, time = 5 } = nextProps;
    this.setState({
      show,
      time,
    });
    if (show) { // 开始
      this.setIntervalTime();
    } else {
      this.clearIntervalTime();
    }
  }

  componentWillUnmount() {
    this.clearIntervalTime();
  }

  setIntervalTime() {
    if (this.timer !== undefined) {
      return;
    }
    this.timer = setInterval(() => {
      if (this.state.time === 0) {
        this.setState({
          show: false,
        });
        this.clearIntervalTime();
        return;
      }
      this.setState({
        time: this.state.time - 1,
      });
    }, 1000);
  }

  clearIntervalTime() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  preveentHandle = (evt: React.MouseEvent<HTMLElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
  }

  render() {
    return (
      <div onClick={this.preveentHandle} className={cx('counttimer', this.state.show ? 'counttimerShow' : '')}>
        <div className={cx('counttimerMask')} />
        <div className={cx('counttimerMain')}>{this.state.time}</div>
      </div>
    );
  }
}

export default CountTimer;
