import {
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_ERROR,
  DELETE_SUPER_ADMINS_SUCCESS
} from './constants';

export const getSuperAdminsPending = () => {
  return {
    type: GET_SUPER_ADMINS_PENDING
  };
};

export const getSuperAdminsSuccess = (payload) => {
  return {
    type: GET_SUPER_ADMINS_SUCCESS,
    payload
  };
};

export const getSuperAdminsError = () => {
  return {
    type: GET_SUPER_ADMINS_ERROR
  };
};

export const deleteSuperAdminsSuccess = (payload) => {
  return {
    type: DELETE_SUPER_ADMINS_SUCCESS,
    payload
  };
};
