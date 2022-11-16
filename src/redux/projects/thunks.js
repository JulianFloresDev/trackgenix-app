import { editItem, setModalContent, setShowModal } from '../global/actions';
import {
  getProjectsError,
  getProjectsPending,
  getProjectsSuccess,
  deleteProjectPending,
  deleteProjectSuccess,
  deleteProjectError
} from './actions';

export const getProjects = (id) => {
  return async (dispatch) => {
    dispatch(getProjectsPending());
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`);
      const response = await request.json();
      if (response.error) {
        throw new Error(response);
      } else {
        id ? dispatch(editItem(response.data)) : dispatch(getProjectsSuccess(response.data));
      }
    } catch (error) {
      dispatch(getProjectsError(error));
    }
  };
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    dispatch(deleteProjectPending());
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (request.status >= 400) {
        throw new Error(request.statusText);
      } else {
        dispatch(deleteProjectSuccess(id));
        dispatch(setModalContent(<p>Project Deleted Successfully!</p>));
        setTimeout(() => dispatch(setShowModal(false)), 2000);
      }
    } catch (error) {
      dispatch(deleteProjectError());
      dispatch(setModalContent(<p>{error.toString()}</p>));
      setTimeout(() => dispatch(setShowModal(false)), 2000);
    }
  };
};

export const editProject = (id, body) => {
  return async (dispatch) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
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
        dispatch(setModalContent(<p>Project edited successfully!</p>));
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

export const createProject = (body) => {
  return async (dispatch) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
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
        dispatch(setModalContent(<p>Project created successfully!</p>));
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
