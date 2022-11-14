import {
  GET_SUPER_ADMINS_FULFILLED,
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_REJECTED
} from './constants';

export const getSuperAdminsFulfilled = (payload) => {
  return {
    type: GET_SUPER_ADMINS_FULFILLED,
    payload
  };
};

export const getSuperAdminsPending = () => {
  return {
    type: GET_SUPER_ADMINS_PENDING
  };
};

export const getSuperAdminsRejected = () => {
  return {
    type: GET_SUPER_ADMINS_REJECTED
  };
};
