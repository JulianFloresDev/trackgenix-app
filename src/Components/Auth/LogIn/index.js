import React from 'react';
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
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(loginSchema),
    mode: 'onBlur'
  });
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
              <img src={`${process.env.PUBLIC_URL}/assets/images/black-envelope.svg`} />
              <input className={styles.loginInput} {...register('email')} type={'text'}></input>
            </div>
            <div className={styles.formBox}>
              <img src={`${process.env.PUBLIC_URL}/assets/images/lock.svg`} />
              <input
                className={styles.loginInput}
                {...register('password')}
                type={'password'}
              ></input>
            </div>
            <div className={styles.loginFunctionalities}>
              <div>
                <input type={'checkbox'}></input>
                <label>Remember me</label>
              </div>
              <p>Forgot password?</p>
            </div>
            {(errors.email || errors.password) && (
              <div className={styles.errorsBox}>
                {errors.email && (
                  <div className={styles.errorBox}>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/x.svg`}
                      className={styles.firstErrorImg}
                      onClick={() => {
                        delete errors.email;
                        history.push(history.location);
                      }}
                    />
                    <p>{errors.email.message}</p>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/x.svg`}
                      className={styles.lastErrorImg}
                    />
                  </div>
                )}
                {errors.password && (
                  <div className={styles.errorBox}>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/x.svg`}
                      className={styles.firstErrorImg}
                      onClick={() => {
                        delete errors.password;
                        history.push(history.location);
                      }}
                    />
                    <p>{errors.password.message}</p>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/x.svg`}
                      className={styles.lastErrorImg}
                    />
                  </div>
                )}
              </div>
            )}
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
