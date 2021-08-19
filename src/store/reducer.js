import { combineReducers } from 'redux';

import toastReducer from './toast/toastReducer';
import pilotReducer from './pilot/pilotReducer';

const rootReducer = combineReducers({
  toast: toastReducer,
  pilot: pilotReducer,
});

export default rootReducer;
