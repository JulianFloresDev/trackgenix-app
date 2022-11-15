import { editItem } from '../global/actions';
import { getProjectsError, getProjectsPending, getProjectsSuccess } from './actions';

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
