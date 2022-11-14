import {
  GET_SUPER_ADMINS_FULFILLED,
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_REJECTED
} from './constants';

const getSuperAdminsFulfilled = () => {
  return {
    type: GET_SUPER_ADMINS_FULFILLED
  };
};

const getSuperAdminsPending = (data) => {
  return {
    type: GET_SUPER_ADMINS_PENDING,
    payload: data
  };
};

const getSuperAdminsRejected = (error) => {
  return {
    type: GET_SUPER_ADMINS_REJECTED,
    payload: error
  };
};

export const getSuperAdmins = () => {
  return (dispatch) => {
    dispatch(getSuperAdminsPending());
    fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getSuperAdminsFulfilled(response.data));
      })
      .catch((err) => {
        dispatch(getSuperAdminsRejected(err.toString()));
      });
  };
};
