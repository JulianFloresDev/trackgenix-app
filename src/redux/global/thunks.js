import { setUser, getUserError, fetchDataOn } from './actions';

export const getUser = (userEmail) => {
  return async (dispatch) => {
    dispatch(fetchDataOn());
    const email = userEmail || sessionStorage.getItem('email');
    try {
      const superAdminReq = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'GET',
        headers: {
          ContentType: 'aplication/json',
          token: sessionStorage.getItem('token')
        }
      });
      const adminReq = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'GET',
        headers: {
          ContentType: 'aplication/json',
          token: sessionStorage.getItem('token')
        }
      });
      const employeeReq = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'GET',
        headers: {
          ContentType: 'aplication/json',
          token: sessionStorage.getItem('token')
        }
      });
      const superAdminsRes = await superAdminReq.json();
      const adminsRes = await adminReq.json();
      const employeeRes = await employeeReq.json();

      const superAdminList = superAdminsRes.data;
      const adminList = adminsRes.data;
      const employeeList = employeeRes.data;

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
