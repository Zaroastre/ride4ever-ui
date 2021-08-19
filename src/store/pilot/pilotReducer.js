import * as pilotAction from './pilotActionType';

const initialState = {
  entity: null,
};

export default function pilotReducer(state = initialState, action) {
  switch (action.type) {
    case pilotAction.SET_PILOT:
      return {
        ...state,
        entity: action.data,
      };
    case pilotAction.RESET_PILOT:
      return {
        entity: initialState.entity,
      };
    default:
      return state;
  }
}
