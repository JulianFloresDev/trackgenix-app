import {
  setModalContent,
  setShowModal,
  editItem,
  fetchDataOff,
  fetchDataOn
} from '../global/actions';
import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  deleteAdminsPending,
  deleteAdminsSuccess,
  deleteAdminsError
} from './actions';
import modalStyles from 'Components/Share/Modal/modal.module.css';

export const getAdmins = (id) => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    dispatch(fetchDataOn());
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`);
      const response = await request.json();
      if (response.error) {
        throw new Error(response);
      } else {
        id
          ? (dispatch(editItem(response.data)), dispatch(fetchDataOff()))
          : (dispatch(getAdminsSuccess(response.data)), dispatch(fetchDataOff()));
      }
    } catch (error) {
      dispatch(getAdminsError(error));
      dispatch(fetchDataOff());
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
        dispatch(
          setModalContent(<h3 className={modalStyles.title}>Admin Deleted Successfully!</h3>)
        );
      }
    } catch (error) {
      dispatch(deleteAdminsError());
      dispatch(setModalContent(<h3 className={modalStyles.title}>{error.toString()}</h3>));
      dispatch(setShowModal(true));
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
                <>
                  <h3 className={modalStyles.title}>Mmmm some inputs are invalid!! Check them:</h3>
                  <ul>
                    {response.message.map((info, index) => {
                      return <li key={index}>{info.message}</li>;
                    })}
                  </ul>
                </>
              )
            : setModalContent(
                <h3 className={modalStyles.title}>
                  {response.message || 'An unexpected error has occurred'}
                </h3>
              )
        );
        dispatch(setShowModal(true));
      } else {
        dispatch(
          setModalContent(<h3 className={modalStyles.title}>Admin edited successfully!</h3>)
        );
        dispatch(setShowModal(true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const createAdmin = (body) => {
  return async (dispatch) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token')
        },
        body: JSON.stringify(body)
      });
      const response = await request.json();
      if (response.error) {
        dispatch(
          Array.isArray(response.message)
            ? setModalContent(
                <>
                  <h3 className={modalStyles.title}>Mmmm some inputs are invalid!! Check them:</h3>
                  <ul>
                    {response.message.map((info, index) => {
                      return <li key={index}>{info.message}</li>;
                    })}
                  </ul>
                </>
              )
            : setModalContent(
                <h3 className={modalStyles.title}>
                  {response.message || 'An unexpected error has occurred'}
                </h3>
              )
        );
        dispatch(setShowModal(true));
      } else {
        dispatch(
          setModalContent(<h3 className={modalStyles.title}>Admin created successfully!</h3>)
        );
        dispatch(setShowModal(true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
