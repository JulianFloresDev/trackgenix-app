import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { loginSchema } from 'Validations/loginSchema';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/auth/thunks';
import { useHistory } from 'react-router-dom';
import { InputForm, Modal, Spinner } from 'Components/Share';
import { setModalContent, setShowModal } from 'redux/global/actions';

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
    mode: 'onChange'
  });

  const onSubmit = async (inputData) => {
    const role = await dispatch(login(inputData));
    if (error) {
      dispatch(
        setModalContent(
          <div>
            <h2>There was an error whit Login data!!</h2>
            <p>Email or password are invalid!!</p>
            <p>{error?.toString()}</p>
          </div>
        )
      );
      dispatch(setShowModal(true));
    }
    if (role) {
      switch (role) {
        case 'super-admin':
          dispatch(setModalContent(<></>));
          dispatch(setShowModal(false));
          history.push('/super-admins');
          break;
        case 'admin':
          dispatch(setModalContent(<></>));
          dispatch(setShowModal(false));
          history.push('/admins');
          break;
        case 'employee':
          dispatch(setModalContent(<></>));
          dispatch(setShowModal(false));
          history.push('/employees');
          break;
        default:
          return null;
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Modal showModal={showModal}>{modalContent}</Modal>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit">Log In</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
