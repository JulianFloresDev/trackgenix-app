import { getAdminsPending, getAdminsSuccess, getAdminsError } from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const response = await request.json();
      if (response.error) {
        throw new Error(response);
      } else {
        dispatch(getAdminsSuccess(response.data));
      }
    } catch (error) {
      dispatch(getAdminsError(error.message));
    }
  };
};
