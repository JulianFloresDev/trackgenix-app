import {
  setModalContent,
  setShowModal,
  editItem,
  fetchDataOff,
  fetchDataOn
} from '../global/actions';
import {
  getTimesheetsPending,
  getTimesheetsSuccess,
  getTimesheetsError,
  deleteTimesheetsSuccess
} from './actions';
import modalStyles from '../../Components/Share/Modal/modal.module.css';

export const getTimesheets = (id) => {
  return async (dispatch) => {
    try {
      dispatch(fetchDataOn());
      dispatch(getTimesheetsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`);
      const data = await response.json();
      if (data.error) {
        throw new Error();
      }
      id
        ? (dispatch(editItem(data.data)), dispatch(fetchDataOff()))
        : (dispatch(getTimesheetsSuccess(data.data)), dispatch(fetchDataOff()));
    } catch (error) {
      dispatch(getTimesheetsError());
      dispatch(fetchDataOff());
    }
  };
};

export const deleteTimesheets = (id) => {
  return async (dispatch) => {
    try {
      const req = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (req.status >= 400) {
        throw new Error(req.statusText);
      }
      dispatch(deleteTimesheetsSuccess(id));
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

export const editTimesheets = (id, body) => {
  return async (dispatch) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
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
          setModalContent(<h3 className={modalStyles.title}>Employee edited successfully!</h3>)
        );
        dispatch(setShowModal(true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const createTimesheets = (body) => {
  return async (dispatch) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`, {
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
          setModalContent(<h3 className={modalStyles.title}>Admin created successfully!</h3>)
        );
        dispatch(setShowModal(true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
