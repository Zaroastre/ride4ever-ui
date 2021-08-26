/* eslint-disable import/prefer-default-export */
import * as types from './languageActionType';

export const setLanguage = (data) => ({
  type: types.SET_LANGUAGE,
  data,
});
