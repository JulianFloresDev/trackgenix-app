import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { loginSchema } from 'Validations/loginSchema';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/auth/thunks';
import { useHistory } from 'react-router-dom';
import { Modal, Spinner, BackArrow } from 'Components/Share';
import { setModalContent, setShowModal } from 'redux/global/actions';
import styles from './login.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error, isLoading } = useSelector((state) => state.auth);
  const { showModal, modalContent } = useSelector((state) => state.global);
  const [isPasswordVisible, setPasswordHidden] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(loginSchema),
    mode: 'onBlur'
  });

  const changeVisibility = () => {
    isPasswordVisible ? setPasswordType('password') : setPasswordType('text');
    setPasswordHidden(!isPasswordVisible);
  };

  const onSubmit = async (inputData) => {
    const role = await dispatch(login(inputData));
    !role
      ? (dispatch(
          setModalContent(
            <div>
              <h2>There was an error whit Login data!!</h2>
              <p>Email or password are invalid!!</p>
              <p>{error?.toString()}</p>
            </div>
          )
        ),
        dispatch(setShowModal(true)))
      : history.push('/home');
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.loginContainer}>
          <Modal showModal={showModal}>{modalContent}</Modal>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
            <div className={styles.loginHeader}>
              <figure>
                <BackArrow pushTo={'/home'} />
              </figure>
              <h2>Log In</h2>
            </div>
            <div className={styles.formBox}>
              <label htmlFor="loginEmail">
                <img src={`${process.env.PUBLIC_URL}/assets/images/black-envelope.svg`} />
              </label>
              <input
                id="loginEmail"
                className={styles.loginInput}
                {...register('email')}
                type={'text'}
              ></input>
            </div>
            {errors.email && (
              <div className={styles.errorBox}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/x.svg`}
                  className={styles.firstErrorImg}
                />
                <p>{errors.email.message}</p>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/x.svg`}
                  className={styles.lastErrorImg}
                />
              </div>
            )}
            <div className={styles.formBox}>
              <label htmlFor="loginPassword">
                <img src={`${process.env.PUBLIC_URL}/assets/images/lock.svg`} />
              </label>
              <input
                id="loginPassword"
                className={styles.loginInput}
                {...register('password')}
                type={passwordType}
              ></input>
              <img
                id="loginPasswordShowBtn"
                className={styles.hidePasswordBtn}
                src={
                  isPasswordVisible
                    ? `${process.env.PUBLIC_URL}/assets/images/show-eye.svg`
                    : `${process.env.PUBLIC_URL}/assets/images/hide-eye.svg`
                }
                onClick={() => changeVisibility()}
              />
            </div>
            {errors.password && (
              <div className={styles.errorBox}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/x.svg`}
                  className={styles.firstErrorImg}
                />
                <p>{errors.password.message}</p>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/x.svg`}
                  className={styles.lastErrorImg}
                />
              </div>
            )}
            <div className={styles.loginFunctionalities}>
              <div>
                <input type={'checkbox'}></input>
                <label>Remember me</label>
              </div>
              <p>Forgot password?</p>
            </div>
            <button type="submit" className={styles.continueBtn}>
              Continue
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
