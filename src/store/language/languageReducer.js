import * as languageAction from './languageActionType';

const initialState = {
  value: 'EN',
};

export default function languageReducer(state = initialState, action) {
  switch (action.type) {
    case languageAction.SET_LANGUAGE:
      return {
        ...state,
        value: action.data,
      };
    default:
      return state;
  }
}
