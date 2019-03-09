const INCREMENT = 'INCREMENT'; // 增加
const DECREMENT = 'DECREMENT'; // 减少
const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';
const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
const INCREMENT_ASYNC_ONCE = 'INCREMENT_ASYNC_ONCE';

export const counterConst ={
  INCREMENT,
  INCREMENT_IF_ODD,
  DECREMENT,
  INCREMENT_ASYNC,
  INCREMENT_ASYNC_ONCE,
};

const initState = 0;

export default function counter(state = initState, action: {type: string}) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case INCREMENT_IF_ODD:
      return (state % 2 !== 0) ? state + 1 : state;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
