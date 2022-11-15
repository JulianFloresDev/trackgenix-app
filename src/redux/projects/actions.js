import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  PUT_PROJECTS_PENDING,
  PUT_PROJECTS_SUCCESS,
  PUT_PROJECTS_ERROR,
  POST_PROJECTS_PENDING,
  POST_PROJECTS_SUCCESS,
  POST_PROJECTS_ERROR,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_ERROR
} from './constants';

export function getProjectsPending() {
  return {
    type: GET_PROJECTS_PENDING
  };
}

export function getProjectsSuccess(data) {
  return {
    type: GET_PROJECTS_SUCCESS,
    payload: data
  };
}

export function getProjectsError(error) {
  return {
    type: GET_PROJECTS_ERROR,
    payload: error
  };
}

export function putProjectsPending() {
  return {
    type: PUT_PROJECTS_PENDING
  };
}

export function putProjectsSuccess(data) {
  return {
    type: PUT_PROJECTS_SUCCESS,
    payload: data
  };
}

export function putProjectsError(error) {
  return {
    type: PUT_PROJECTS_ERROR,
    payload: error
  };
}

export function postProjectsPending() {
  return {
    type: POST_PROJECTS_PENDING
  };
}

export function postProjectsSuccess(data) {
  return {
    type: POST_PROJECTS_SUCCESS,
    payload: data
  };
}

export function postProjectsError(error) {
  return {
    type: POST_PROJECTS_ERROR,
    payload: error
  };
}

export function deleteProjectsPending() {
  return {
    type: DELETE_PROJECTS_PENDING
  };
}

export function deleteProjectsSuccess(data) {
  return {
    type: DELETE_PROJECTS_SUCCESS,
    payload: data
  };
}

export function deleteProjectsError(error) {
  return {
    type: DELETE_PROJECTS_ERROR,
    payload: error
  };
}
