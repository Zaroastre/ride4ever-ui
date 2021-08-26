import { combineReducers } from 'redux';

import toastReducer from './toast/toastReducer';
import bikerReducer from './biker/bikerReducer';
import languageReducer from './language/languageReducer';

const rootReducer = combineReducers({
  toast: toastReducer,
  biker: bikerReducer,
  language: languageReducer,
});

export default rootReducer;
