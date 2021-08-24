import * as bikerAction from './bikerActionType';

const initialState = {
  entity: null,
};

export default function bikerReducer(state = initialState, action) {
  switch (action.type) {
    case bikerAction.SET_BIKER:
      return {
        ...state,
        entity: action.data,
      };
    case bikerAction.RESET_BIKER:
      return {
        entity: null,
      };
    default:
      return state;
  }
}
