import styles from './navbar.module.css';
import modalStyles from 'Components/Share/Modal/modal.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { InputForm, Modal } from 'Components/Share';
import { setModalContent, setShowModal, setUser } from 'redux/global/actions';
import { getEmployees } from 'redux/employees/thunks';
import { userValidation } from './userValidation';

const Navbar = ({ navOptions }) => {
  useEffect(() => {
    dispatch(getEmployees(''));
  }, []);

  const history = useHistory();
  const dispatch = useDispatch();
  const { user, showModal, modalContent } = useSelector((state) => state.global);
  const { list: superAdminsList } = useSelector((state) => state.superAdmins);
  const { list: adminsList } = useSelector((state) => state.admins);
  const { list: employeeList } = useSelector((state) => state.employees);
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    node: 'onChange',
    resolver: joiResolver(userValidation)
  });

  const submitUserLogInData = (data) => {
    const isEmployee = employeeList.some(
      (employee) => employee.email === data.email && employee.password === data.password
    );
    const isAdmin = employeeList.some(
      (admin) => admin.email === data.email && admin.password === data.password
    );
    const isSuperAdmin = employeeList.some(
      (superAdmin) => superAdmin.email === data.email && superAdmin.password === data.password
    );
    const userLogged =
      superAdminsList.find(
        (superAdmin) => superAdmin.email === data.email && superAdmin.password === data.password
      ) ||
      adminsList.find((admin) => admin.email === data.email && admin.password === data.password) ||
      employeeList.find((emp) => emp.email === data.email && emp.password === data.password);

    isSuperAdmin &&
      sessionStorage.setItem('userLogged', JSON.stringify({ ...userLogged, token: 'superAdmin' }));
    isAdmin &&
      sessionStorage.setItem('userLogged', JSON.stringify({ ...userLogged, token: 'admin' }));
    isEmployee &&
      sessionStorage.setItem('userLogged', JSON.stringify({ ...userLogged, token: 'employee' }));

    (isSuperAdmin || isAdmin || isEmployee) &&
      (dispatch(setUser(userLogged)),
      dispatch(setModalContent(<h3>Logged Sussfully!!!</h3>)),
      setTimeout(() => {
        dispatch(setShowModal(false));
        history.push('/');
      }, 1000));
  };

  const logIn = () => {
    dispatch(
      setModalContent(
        <div>
          <form onSubmit={handleSubmit(submitUserLogInData)}>
            <InputForm
              register={register}
              element={'email'}
              label={'Email'}
              inputType={'text'}
              error={errors.email?.message}
            />
            <InputForm
              register={register}
              element={'password'}
              label={'Password'}
              inputType={'password'}
              error={errors.password?.message}
            />
            <button type="submit" className={modalStyles.confirmBtn}>
              Log In
            </button>
          </form>
        </div>
      )
    );
    dispatch(setShowModal(true));
  };
  return (
    <>
      <Modal showModal={showModal}>{modalContent}</Modal>
      <div className={styles.flexContainer}>
        <ul className={styles.rutes}>
          {navOptions?.map((endPoint, index) => {
            return (
              <li key={index}>
                <a href={`/${endPoint}`}>{endPoint.toUpperCase()}</a>
              </li>
            );
          })}
        </ul>
        <div className={styles.buttonsContainer}>
          {!user._id && (
            <button
              className={styles.buttonItem}
              onClick={() => {
                logIn();
              }}
            >
              Log In
            </button>
          )}
          {user._id && (
            <button
              className={styles.buttonItem}
              onClick={() => {
                dispatch(setUser({}));
                sessionStorage.removeItem('userLogged');
                history.push('/');
              }}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
