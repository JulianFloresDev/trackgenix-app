import { setShowModal } from '../global/actions';
import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  deleteAdminsPending,
  deleteAdminsSuccess,
  deleteAdminsError
} from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const response = await request.json();
      if (response.error) {
        throw new Error(response);
      } else {
        dispatch(getAdminsSuccess(response.data));
      }
    } catch (error) {
      dispatch(getAdminsError(error));
    }
  };
};

export const deleteAdminByID = (id) => {
  return async (dispatch) => {
    dispatch(deleteAdminsPending());
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const response = await request.json();
      if (response.error) {
        throw new Error(response);
      } else {
        dispatch(deleteAdminsSuccess(id));
        dispatch(setShowModal(false));
      }
    } catch (error) {
      dispatch(deleteAdminsError(error.message));
      setTimeout(dispatch(setShowModal(false)), 2000);
    }
  };
};
