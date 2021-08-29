import { combineReducers } from 'redux';

import toastReducer from './toast/toastReducer';
import bikerReducer from './biker/bikerReducer';
import languageReducer from './language/languageReducer';
import reservationReducer from './reservation/reservationReducer';

const rootReducer = combineReducers({
  toast: toastReducer,
  biker: bikerReducer,
  language: languageReducer,
  reservations: reservationReducer,
});

export default rootReducer;
