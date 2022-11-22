import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './navbar.module.css';
import { InputForm, Modal } from 'Components/Share';
import { setModalContent, setShowModal, setUser } from 'redux/global/actions';
import { useForm } from 'react-hook-form';
import { getEmployees } from 'redux/employees/thunks';
import { useHistory } from 'react-router-dom';

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
    node: 'onChange'
  });

  const submitUserLogInData = (data) => {
    const userExist = usersList.some(
      (employee) => employee.email === data.email && employee.password === data.password
    );
    const userLogged = usersList.find(
      (employee) => employee.email === data.email && employee.password === data.password
    );
    console.log(userLogged);
    userExist
      ? (dispatch(setUser(userLogged)),
        sessionStorage.setItem('userLogged', JSON.stringify(userLogged)),
        dispatch(setModalContent(<h3>Logged Sussfully!!!</h3>)),
        setTimeout(() => dispatch(setShowModal(false)), 1000))
      : (dispatch(setModalContent(<h3>User not found</h3>)),
        setTimeout(() => dispatch(setShowModal(false)), 3000));
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
              error={errors.email}
            />
            <InputForm
              register={register}
              element={'password'}
              label={'Password'}
              inputType={'password'}
              error={errors.password}
            />
            <button type="submit">Log In</button>
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
