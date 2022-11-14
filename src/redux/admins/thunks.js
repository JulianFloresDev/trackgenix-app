import { setModalContent, setShowModal } from '../global/actions';
import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  deleteAdminsPending,
  deleteAdminsSuccess,
  deleteAdminsError
} from './actions';

export const getAdmins = (id) => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`);
      const response = await request.json();
      if (response.error) {
        throw new Error(response);
      } else {
        !id && dispatch(getAdminsSuccess(response.data));
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
      if (request.status >= 400) {
        throw new Error(request.statusText);
      } else {
        dispatch(deleteAdminsSuccess(id));
        dispatch(setModalContent(<p>Admin Deleted Successfully!</p>));
        setTimeout(() => dispatch(setShowModal(false)), 2000);
      }
    } catch (error) {
      dispatch(deleteAdminsError());
      dispatch(setModalContent(<p>{error.toString()}</p>));
      setTimeout(() => dispatch(setShowModal(false)), 2000);
    }
  };
};
