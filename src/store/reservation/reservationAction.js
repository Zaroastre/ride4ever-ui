/* eslint-disable import/prefer-default-export */
import * as types from './reservationActionType';

export const setReservations = (data) => ({
  type: types.SET_RESERVATIONS,
  data,
});
