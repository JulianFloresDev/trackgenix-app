import {
  GET_TASKS_PENDING,
  CREATE_TASKS_PENDING,
  EDIT_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  DELETE_TASKS_SUCCESS,
  GET_TASKS_ERROR
} from './constants';

export const getTasksPending = () => {
  return {
    type: GET_TASKS_PENDING
  };
};

export const createTasksPending = () => {
  return {
    type: CREATE_TASKS_PENDING
  };
};

export const editTasksPending = () => {
  return {
    type: EDIT_TASKS_PENDING
  };
};

export const getTasksSuccess = (payload) => {
  return {
    type: GET_TASKS_SUCCESS,
    payload
  };
};

export const deleteTasksSuccess = (payload) => {
  return {
    type: DELETE_TASKS_SUCCESS,
    payload
  };
};

export const getTasksError = () => {
  return {
    type: GET_TASKS_ERROR
  };
};
