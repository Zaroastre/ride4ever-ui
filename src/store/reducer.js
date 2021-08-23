import { combineReducers } from 'redux';

import toastReducer from './toast/toastReducer';
import bikerReducer from './biker/bikerReducer';

const rootReducer = combineReducers({
  toast: toastReducer,
  biker: bikerReducer,
});

export default rootReducer;
