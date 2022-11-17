import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  deleteSuperAdminsSuccess
} from './actions';
import {
  setShowModal,
  setModalContent,
  editItem,
  fetchDataOn,
  fetchDataOff
} from '../global/actions';
import modalStyles from '../../Components/Share/Modal/modal.module.css';

export const getSuperAdmins = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSuperAdminsPending());
      dispatch(fetchDataOn());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`);
      const data = await response.json();
      if (data.error) {
        throw new Error();
      }
      id
        ? (dispatch(editItem(response.data)), dispatch(fetchDataOff()))
        : (dispatch(getSuperAdminsSuccess(data.data)), dispatch(fetchDataOff()));
    } catch (error) {
      dispatch(getSuperAdminsError());
      dispatch(fetchDataOff());
    }
  };
};

export const deleteSuperAdmins = (id) => {
  return async (dispatch) => {
    try {
      const req = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (req.status >= 400) {
        throw new Error(req.statusText);
      }
      dispatch(deleteSuperAdminsSuccess(id));
      dispatch(
        setModalContent(<h3 className={modalStyles.title}>Super Admin deleted successfully!</h3>)
      );
      dispatch(setShowModal(true));
      setTimeout(() => dispatch(setShowModal(false)), 2000);
    } catch (error) {
      dispatch(setModalContent(<h3 className={modalStyles.title}>{error.toString()}</h3>));
      dispatch(setShowModal(true));
      setTimeout(() => dispatch(setShowModal(false)), 2000);
    }
  };
};

export const editSuperAdmin = (id, body) => {
  return async (dispatch) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
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
          setModalContent(<h3 className={modalStyles.title}>Super Admin edited successfully!</h3>)
        );
        dispatch(setShowModal(true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const createSuperAdmin = (body) => {
  return async (dispatch) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
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
          setModalContent(<h3 className={modalStyles.title}>Super Admin created successfully!</h3>)
        );
        dispatch(setShowModal(true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
