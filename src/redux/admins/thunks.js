import { setModalContent, setShowModal, editItem } from '../global/actions';
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
        id ? dispatch(editItem(response.data)) : dispatch(getAdminsSuccess(response.data));
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

export const editAdmin = (id, body) => {
  return async (dispatch) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const response = await request.json();
      if (response.error) {
        dispatch(
          Array.isArray(response.message)
            ? setModalContent(
                <div>
                  <ul>
                    {response.message.map((info, index) => {
                      return <li key={index}>{info.message}</li>;
                    })}
                  </ul>
                </div>
              )
            : setModalContent(response.message || 'An unexpected error has occurred')
        );
        dispatch(setShowModal(true));
        setTimeout(() => dispatch(setShowModal(false)), 2000);
      } else {
        dispatch(setModalContent(<p>Admin edited successfully!</p>));
        dispatch(setShowModal(true));
        setTimeout(() => {
          dispatch(setShowModal(false));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };
};
