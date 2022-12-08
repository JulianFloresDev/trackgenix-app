import { login } from 'redux/auth/thunks';
import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  deleteEmployeesSuccess
} from './actions';
import {
  setShowModal,
  setModalContent,
  editItem,
  fetchDataOn,
  fetchDataOff
} from 'redux/global/actions';
import modalStyles from 'Components/Share/Modal/modal.module.css';

export const getEmployees = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getEmployeesPending());
      dispatch(fetchDataOn());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token')
        }
      });
      const data = await response.json();
      if (data.error) {
        throw new Error();
      } else {
        id
          ? (dispatch(editItem(data.data)), dispatch(fetchDataOff()))
          : (dispatch(getEmployeesSuccess(data.data)), dispatch(fetchDataOff()));
      }
    } catch (error) {
      dispatch(getEmployeesError());
      dispatch(fetchDataOff());
    }
  };
};

export const deleteEmployees = (id, firebaseUid) => {
  return async (dispatch) => {
    try {
      const req = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token'),
          uid: firebaseUid
        }
      });
      if (req.status >= 400) {
        throw new Error(req.statusText);
      }
      dispatch(deleteEmployeesSuccess(id));
      dispatch(
        setModalContent(<h3 className={modalStyles.title}>Employee deleted successfully!</h3>)
      );
      dispatch(setShowModal(true));
    } catch (error) {
      dispatch(setModalContent(<h3 className={modalStyles.title}>{error.toString()}</h3>));
      dispatch(setShowModal(true));
    }
  };
};

export const editEmployee = (id, body) => {
  return async (dispatch) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
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
          setModalContent(<h3 className={modalStyles.title}>Employee edited successfully!</h3>)
        );
        dispatch(setShowModal(true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const createEmployee = (body) => {
  return async (dispatch) => {
    dispatch(fetchDataOn());
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
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
        return false;
      } else {
        dispatch(login(body));
        dispatch(fetchDataOff());
        return true;
      }
    } catch (error) {
      dispatch(
        setModalContent(
          <>
            <h3 className={modalStyles.title}>Error: Cant connect with server!</h3>
            <p className={modalStyles.info}>Mmmm!! Something was wrong with you registration.</p>
            <p className={modalStyles.info}>
              Check your internet connection please! If error persist try in a few minutes or{' '}
              <a href={'/home'} className={modalStyles.reference}>
                contact us.
              </a>
            </p>
          </>
        )
      );
      dispatch(setShowModal(true));
      dispatch(fetchDataOff());
      console.error(error);
      return false;
    }
  };
};
