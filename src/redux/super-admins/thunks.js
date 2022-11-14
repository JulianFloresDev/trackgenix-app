import { getSuperAdminsPending, getSuperAdminsFulfilled, getSuperAdminsRejected } from './actions';

// import { setShowModal, setModalContent } from '../global/actions';

export const getSuperAdmins = () => {
  return async (dispatch) => {
    try {
      dispatch(getSuperAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      if (data.error) {
        throw new Error();
      }
      dispatch(getSuperAdminsFulfilled(data.data));
    } catch (error) {
      dispatch(getSuperAdminsRejected());
    }
  };
};
