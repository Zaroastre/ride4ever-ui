import * as bikerAction from './bikerActionType';

const initialState = {
  people: null,
};

export default function bikerReducer(state = initialState, action) {
  switch (action.type) {
    case bikerAction.SET_BIKER:
      return {
        ...state,
        people: action.data,
      };
    case bikerAction.RESET_BIKER:
      return {
        people: null,
      };
    default:
      return state;
  }
}
