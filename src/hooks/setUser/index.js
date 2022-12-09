import store from 'redux/store';
import { useSelector } from 'react-redux';
import { setUser } from 'redux/global/actions';

export const setGlobalUser = () => {
  const email = sessionStorage.getItem('email');

  const { list: superAdmins } = useSelector((store) => store.superAdmins);
  const { list: admins } = useSelector((store) => store.admins);
  const { list: employees } = useSelector((store) => store.employees);

  const user =
    superAdmins.find((users) => users.email === email) ||
    admins.find((users) => users.email === email) ||
    employees.find((users) => users.email === email) ||
    {};

  store.dispatch(setUser(user));
  return user;
};
