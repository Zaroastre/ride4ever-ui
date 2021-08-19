import * as toastAction from './toastActionType';

const initialState = {
  isShow: false,
  severity: null,
  summary: null,
  detail: null,
};

export default function toastReducer(state = initialState, action) {
  switch (action.type) {
    case toastAction.SHOW_TOAST:
      return {
        ...state,
        isShow: true,
        severity: action.data.severity,
        summary: action.data.summary,
        detail: action.data.detail,
      };
    case toastAction.RESET_TOAST:
      return {
        ...state,
        isShow: false,
        severity: null,
        summary: null,
        detail: null,
      };
    default:
      return state;
  }
}
