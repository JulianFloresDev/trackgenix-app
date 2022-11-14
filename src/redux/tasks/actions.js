import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  CREATE_TASKS_PENDING,
  CREATE_TASKS_SUCCESS,
  CREATE_TASKS_ERROR,
  EDIT_TASKS_PENDING,
  EDIT_TASKS_SUCCESS,
  EDIT_TASKS_ERROR,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_SUCCESS,
  DELETE_TASKS_ERROR
} from './constants';

export const getTasksPending = () => {
  return {
    type: GET_TASKS_PENDING
  };
};

export const getTasksSuccess = (data) => {
  return {
    type: GET_TASKS_SUCCESS,
    payload: data
  };
};

export const getTasksError = (error) => {
  return {
    type: GET_TASKS_ERROR,
    payload: error
  };
};

export const createTasksPending = () => {
  return {
    type: CREATE_TASKS_PENDING
  };
};

export const createTasksSuccess = (data) => {
  return {
    type: CREATE_TASKS_SUCCESS,
    payload: data
  };
};

export const createTasksError = (error) => {
  return {
    type: CREATE_TASKS_ERROR,
    payload: error
  };
};

export const editTasksPending = () => {
  return {
    type: EDIT_TASKS_PENDING
  };
};

export const editTasksSuccess = (data) => {
  return {
    type: EDIT_TASKS_SUCCESS,
    payload: data
  };
};

export const editTasksError = (error) => {
  return {
    type: EDIT_TASKS_ERROR,
    payload: error
  };
};

export const deleteTasksPending = () => {
  return {
    type: DELETE_TASKS_PENDING
  };
};

export const deleteTasksSuccess = (data) => {
  return {
    type: DELETE_TASKS_SUCCESS,
    payload: data
  };
};

export const deleteTasksError = (error) => {
  return {
    type: DELETE_TASKS_ERROR,
    payload: error
  };
};
