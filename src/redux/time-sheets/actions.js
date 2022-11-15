import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEETS_SUCCESS
} from './constants';

export const getEmployeesPending = () => {
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

export const getEmployeesError = () => {
  return {
    type: GET_TIMESHEETS_ERROR
  };
};

export const deleteEmployeesSuccess = (payload) => {
  return {
    type: DELETE_TIMESHEETS_SUCCESS,
    payload
  };
};
