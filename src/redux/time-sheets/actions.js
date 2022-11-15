import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEETS_SUCCESS
} from './constants';

export const getTimesheetsPending = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

export const getEmployeesSuccess = (payload) => {
  return {
    type: GET_TIMESHEETS_SUCCESS,
    payload
  };
};

export const getTimesheetsError = () => {
  return {
    type: GET_TIMESHEETS_ERROR
  };
};

export const deleteTimesheetsSuccess = (payload) => {
  return {
    type: DELETE_TIMESHEETS_SUCCESS,
    payload
  };
};
