import { setUser, getUserError } from './actions';

const getUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`);
      const data = await response.json();
      if (data.error) {
        throw new Error();
      } else {
        dispatch(setUser(data.data));
      }
    } catch (error) {
      dispatch(getUserError());
    }
  };
};

export default getUser;
