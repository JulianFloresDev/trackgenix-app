import {
  getTasksPending,
  createTasksPending,
  editTasksPending,
  getTasksSuccess,
  deleteTasksSuccess,
  getTasksError
} from './actions';
import {
  editItem,
  setShowModal,
  setModalContent,
  fetchDataOn,
  fetchDataOff
} from 'redux/global/actions';
import modalStyles from 'Components/Share/Modal/modal.module.css';

export const getTasks = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getTasksPending());
      dispatch(fetchDataOn());
      const request = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
      const response = await request.json();
      if (response.error) {
        throw new Error();
      } else {
        id
          ? (dispatch(editItem(response.data)), dispatch(fetchDataOff()))
          : (dispatch(getTasksSuccess(response.data)), dispatch(fetchDataOff()));
      }
    } catch (error) {
      dispatch(getTasksError());
      dispatch(fetchDataOff());
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
          setModalContent(<h3 className={modalStyles.title}>Task created successfully!</h3>)
        );
        dispatch(setShowModal(true));
      }
    } catch (error) {
      console.error(error);
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
        dispatch(setModalContent(<h3 className={modalStyles.title}>Task edited successfully!</h3>));
        dispatch(setShowModal(true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteTasks = (id) => {
  return async (dispatch) => {
    try {
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
        dispatch(
          setModalContent(<h3 className={modalStyles.title}>Task deleted successfully!</h3>)
        );
        dispatch(setShowModal(true));
      }
    } catch (error) {
      setModalContent(<h3 className={modalStyles.title}>{error.toString()}</h3>);
      dispatch(setShowModal(true));
    }
  };
};
