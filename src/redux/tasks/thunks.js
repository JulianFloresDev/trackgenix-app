import {
  getTasksPending,
  createTasksPending,
  editTasksPending,
  deleteTasksPending,
  getTasksSuccess,
  deleteTasksSuccess,
  getTasksError
} from './actions';
import { editItem, setShowModal, setModalContent } from '../global/actions';

export const getTasks = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getTasksPending());
      const request = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
      const response = await request.json();
      if (response.error) {
        throw new Error(response.message);
      }
      id ? dispatch(editItem(response.data)) : dispatch(getTasksSuccess(response.data));
    } catch (error) {
      dispatch(getTasksError());
    }
  };
};

export const createTask = (body) => {
  return async (dispatch) => {
    try {
      dispatch(createTasksPending());
      const request = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringfy(body)
      });
      const response = await request.json();
      if (response.error) {
        throw new Error(response);
      }
      dispatch(setModalContent(<p>Task created successfully!</p>));
      dispatch(setShowModal(true));
      setTimeout(() => dispatch(setShowModal(false)), 2000);
    } catch (error) {
      dispatch(
        Array.isArray(error.message)
          ? setModalContent(
              <div>
                <ul>
                  {error.message.map((info, index) => {
                    return <li key={index}>{info.message}</li>;
                  })}
                </ul>
              </div>
            )
          : setModalContent(error.message || 'An unexpected error has occurred')
      );
      dispatch(setShowModal(true));
      setTimeout(() => dispatch(setShowModal(false)), 2000);
    }
  };
};

export const editTask = (id, body) => {
  return async (dispatch) => {
    try {
      dispatch(editTasksPending());
      const request = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringfy(body)
      });
      const response = await request.json();
      if (response.error) {
        throw new Error(response);
      } else {
        dispatch(setModalContent(<p>Task edited successfully!</p>));
        dispatch(setShowModal(true));
        setTimeout(() => dispatch(setShowModal(false)), 2000);
      }
    } catch (error) {
      Array.isArray(error.message)
        ? dispatch(
            setModalContent(
              <div>
                <ul>
                  {error.message.map((info, index) => {
                    return <li key={index}>{info.message}</li>;
                  })}
                </ul>
              </div>
            )
          )
        : setModalContent(error.message || 'An unexpected error occurred');
      dispatch(setShowModal(true));
      setTimeout(() => dispatch(setShowModal(false)), 2000);
    }
  };
};

export const deleteTasks = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteTasksPending());
      const request = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (request.status >= 400) {
        throw new Error(request.statusText);
      } else {
        dispatch(deleteTasksSuccess(id));
        dispatch(setModalContent(<p>Task deleted successfully!</p>));
        dispatch(setShowModal(true));
        setTimeout(() => dispatch(setShowModal(false)), 2000);
      }
    } catch (error) {
      setModalContent(error.toString() || 'An unexpected error occurred');
      dispatch(setShowModal(true));
      setTimeout(() => dispatch(setShowModal(false)), 2000);
    }
  };
};
