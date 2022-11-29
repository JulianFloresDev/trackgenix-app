import {
  setModalContent,
  setShowModal,
  editItem,
  fetchDataOff,
  fetchDataOn
} from 'redux/global/actions';
import {
  getTimesheetsPending,
  getTimesheetsSuccess,
  getTimesheetsError,
  deleteTimesheetsSuccess
} from './actions';
import modalStyles from 'Components/Share/Modal/modal.module.css';

export const getTimesheets = (id) => {
  return async (dispatch) => {
    try {
      dispatch(fetchDataOn());
      dispatch(getTimesheetsPending());
      const request = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token')
        }
      });
      const response = await request.json();
      if (response.error) {
        throw new Error();
      } else {
        id
          ? (dispatch(editItem(response.data)), dispatch(fetchDataOff()))
          : (dispatch(getTimesheetsSuccess(response.data)), dispatch(fetchDataOff()));
      }
    } catch (error) {
      dispatch(getTimesheetsError());
      dispatch(fetchDataOff());
    }
  };
};

export const deleteTimesheets = (id) => {
  return async (dispatch) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token')
        }
      });
      if (request.status >= 400) {
        throw new Error(request.statusText);
      }
      dispatch(deleteTimesheetsSuccess(id));
      dispatch(
        setModalContent(<h3 className={modalStyles.title}>Time Sheet deleted successfully!</h3>)
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
          setModalContent(<h3 className={modalStyles.title}>Time Sheet edited successfully!</h3>)
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
          setModalContent(<h3 className={modalStyles.title}>Time Sheet created successfully!</h3>)
        );
        dispatch(setShowModal(true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
