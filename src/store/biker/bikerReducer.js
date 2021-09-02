import * as bikerAction from './bikerActionType';

/**
 * Initial state of the biker store.
 */
const initialState = {
  people: null,
};

/**
 * The BIKER reducer.
 * @param {*} state State
 * @param {*} action Action
 * @returns Store
 */
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
