import { getProjects } from 'redux/projects/thunks';
import { setUser, getUserError, fetchDataOn } from './actions';

export const getUser = (userEmail, role) => {
  return async (dispatch) => {
    dispatch(fetchDataOn());
    dispatch(getProjects(''));
    const email = userEmail || sessionStorage.getItem('email');
    try {
      let superAdminReq;
      let superAdminRes;
      let adminReq;
      let adminRes;
      let employeeReq;
      let employeeRes;
      role === 'super-admins' &&
        ((superAdminReq = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
          method: 'GET',
          headers: {
            ContentType: 'aplication/json',
            token: sessionStorage.getItem('token')
          }
        })),
        (superAdminRes = await superAdminReq.json()));
      role === 'admin' &&
        ((adminReq = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
          method: 'GET',
          headers: {
            ContentType: 'aplication/json',
            token: sessionStorage.getItem('token')
          }
        })),
        (adminRes = await adminReq.json()));
      role === 'employee' &&
        ((employeeReq = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
          method: 'GET',
          headers: {
            ContentType: 'aplication/json',
            token: sessionStorage.getItem('token')
          }
        })),
        (employeeRes = await employeeReq.json()));

      const superAdminList = superAdminRes?.data;
      const adminList = adminRes?.data;
      const employeeList = employeeRes?.data;

      const user =
        (await superAdminList?.find((user) => user.email === email)) ||
        adminList?.find((user) => user.email === email) ||
        employeeList?.find((user) => user.email === email) ||
        {};
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
      dispatch(getUserError());
    }
  };
};
