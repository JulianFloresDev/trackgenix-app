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
  const { list: usersList } = useSelector((state) => state.employees);
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    node: 'onChange',
    resolver: joiResolver(userValidation)
  });

  const submitUserLogInData = (data) => {
    const userExist = usersList.some(
      (employee) => employee.email === data.email && employee.password === data.password
    );
    const userLogged = usersList.find(
      (employee) => employee.email === data.email && employee.password === data.password
    );
    userExist &&
      sessionStorage.setItem('userLogged', JSON.stringify({ ...userLogged, token: 'employee' })),
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
