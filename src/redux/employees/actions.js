import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_SUCCESS,
  EDIT_EMPLOYEES_PENDING
} from './constants';

export const getEmployeesPending = () => {
  return {
    type: GET_EMPLOYEES_PENDING
  };
};

export const getEmployeesSuccess = (payload) => {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload
  };
};

export const getEmployeesError = () => {
  return {
    type: GET_EMPLOYEES_ERROR
  };
};

export const deleteEmployeesSuccess = (payload) => {
  return {
    type: DELETE_EMPLOYEES_SUCCESS,
    payload
  };
};

export const editEmployeesPending = () => {
  return {
    type: EDIT_EMPLOYEES_PENDING
  };
};

export const editEmployeesSuccess = (payload) => {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload
  };
};

export const editEmployeesError = () => {
  return {
    type: GET_EMPLOYEES_ERROR
  };
};
