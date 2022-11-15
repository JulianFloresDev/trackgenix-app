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
      const request = await fetch(`${process.env.REACT_APP_API_URL}/projects${id}`);
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
