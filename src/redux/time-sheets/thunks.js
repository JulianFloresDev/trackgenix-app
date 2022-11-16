import {
  getTimesheetsPending,
  getTimesheetsSuccess,
  getTimesheetsError,
  deleteTimesheetsSuccess
} from './actions';
import { setShowModal, setModalContent, editItem } from '../global/actions';

export const getTimesheets = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getTimesheetsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`);
      const data = await response.json();
      if (data.error) {
        throw new Error();
      }
      id ? dispatch(editItem(data.data)) : dispatch(getTimesheetsSuccess(data.data));
    } catch (error) {
      dispatch(getTimesheetsError());
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
      dispatch(setModalContent(<p>Employee deleted successfully!</p>));
      dispatch(setShowModal(true));
      setTimeout(() => dispatch(setShowModal(false)), 2000);
    } catch (error) {
      dispatch(setModalContent(<p>{error.toString()}</p>));
      dispatch(setShowModal(true));
      setTimeout(() => dispatch(setShowModal(false)), 2000);
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
        dispatch(setModalContent(<p>Employee edited successfully!</p>));
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
        dispatch(setModalContent(<p>Admin created successfully!</p>));
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
