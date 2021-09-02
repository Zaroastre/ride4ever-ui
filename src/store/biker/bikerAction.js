/* eslint-disable import/prefer-default-export */
import * as types from './bikerActionType';

/**
 * Set the BIKER in the store.
 * @param {Biker} data Biker to set in store.
 * @returns 
 */
export const setBiker = (data) => ({
  type: types.SET_BIKER,
  data,
});

/**
 * Reset the BIKER in the store.
 * @returns None.
 */
export const resetBiker = () => ({
  type: types.RESET_BIKER,
});
