import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  deleteEmployeesSuccess
} from './actions';
import { setShowModal, setModalContent } from '../global/actions';

export const getEmployees = () => {
  return async (dispatch) => {
    try {
      dispatch(getEmployeesPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      if (data.error) {
        throw new Error();
      }
      dispatch(getEmployeesSuccess(data.data));
    } catch (error) {
      dispatch(getEmployeesError());
    }
  };
};

export const deleteEmployees = (id) => {
  return async (dispatch) => {
    try {
      const req = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (req.status >= 400) {
        throw new Error(req.statusText);
      }
      dispatch(deleteEmployeesSuccess(id));
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
