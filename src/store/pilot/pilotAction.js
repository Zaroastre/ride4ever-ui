/* eslint-disable import/prefer-default-export */
import * as types from './pilotActionType';

export const setPilot = (data) => ({
  type: types.SET_PILOT,
  data,
});

export const resetPilot = () => ({
  type: types.RESET_PILOT,
});
