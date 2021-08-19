/* eslint-disable import/prefer-default-export */
import * as types from './toastActionType';

export const setToast = (data) => ({
  type: types.SHOW_TOAST,
  data,
});

export const resetToast = () => ({
  type: types.RESET_TOAST,
});
