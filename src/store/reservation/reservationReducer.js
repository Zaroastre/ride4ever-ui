import * as reservationAction from './reservationActionType';

const initialState = {
  list: [],
};

export default function reservationReducer(state = initialState, action) {
  switch (action.type) {
    case reservationAction.SET_RESERVATIONS:
      return {
        ...state,
        list: action.data,
      };
    default:
      return state;
  }
}
