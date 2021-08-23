/* eslint-disable import/prefer-default-export */
import * as types from './bikerActionType';

export const setBiker = (data) => ({
  type: types.SET_BIKER,
  data,
});

export const resetBiker = () => ({
  type: types.RESET_BIKER,
});
