import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  PUT_ADMINS_PENDING,
  PUT_ADMINS_SUCCESS,
  PUT_ADMINS_ERROR,
  POST_ADMINS_PENDING,
  POST_ADMINS_SUCCESS,
  POST_ADMINS_ERROR,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_SUCCESS,
  DELETE_ADMINS_ERROR
} from './constants';

export function getAdminsPending() {
  return {
    type: GET_ADMINS_PENDING
  };
}

export function getAdminsSuccess(data) {
  return {
    type: GET_ADMINS_SUCCESS,
    payload: data
  };
}

export function getAdminsError(error) {
  return {
    type: GET_ADMINS_ERROR,
    payload: error
  };
}

export function putAdminsPending() {
  return {
    type: PUT_ADMINS_PENDING
  };
}

export function putAdminsSuccess(data) {
  return {
    type: PUT_ADMINS_SUCCESS,
    payload: data
  };
}

export function putAdminsError(error) {
  return {
    type: PUT_ADMINS_ERROR,
    payload: error
  };
}

export function postAdminsPending() {
  return {
    type: POST_ADMINS_PENDING
  };
}

export function postAdminsSuccess(data) {
  return {
    type: POST_ADMINS_SUCCESS,
    payload: data
  };
}

export function postAdminsError(error) {
  return {
    type: POST_ADMINS_ERROR,
    payload: error
  };
}

export function deleteAdminsPending() {
  return {
    type: DELETE_ADMINS_PENDING
  };
}

export function deleteAdminsSuccess(data) {
  return {
    type: DELETE_ADMINS_SUCCESS,
    payload: data
  };
}

export function deleteAdminsError(error) {
  return {
    type: DELETE_ADMINS_ERROR,
    payload: error
  };
}
