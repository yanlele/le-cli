const CT_SHOW = 'CT_SHOW';
const CT_SHOW_REQUEST = 'CT_SHOW_REQUEST';

const CT_HIDE = 'CT_HIDE';
const CT_HIDE_REQUEST = 'CT_HIDE_REQUEST';

export const countTimerConst = {
  CT_HIDE,
  CT_HIDE_REQUEST,
  CT_SHOW,
  CT_SHOW_REQUEST,
};

const STATE = {
  show: false,
};
export default function countTimer(state = STATE, action: { type: string }) {
  switch (action.type) {
    case 'CT_SHOW':
      return Object.assign({}, state, {
        show: true,
      });
    case 'CT_HIDE':
      return Object.assign({}, state, {
        show: false,
      });
    default:
      return state;
  }
}
