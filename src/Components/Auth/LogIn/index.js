import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { loginSchema } from 'Validations/loginSchema';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/Auth/thunks';
import { useHistory } from 'react-router-dom';
import { InputForm } from 'Components/Share';

const Login = () => {
  console.log('LOGIN');
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(loginSchema),
    mode: 'onBlur'
  });

  const onSubmit = (inputData) => {
    if (!error) {
      const role = dispatch(login(inputData));
      if (role) {
        switch (role) {
          case 'SUPER_ADMIN':
            history.push('/super-admins');
            break;
          case 'ADMIN':
            history.push('/admins');
            break;
          case 'EMPLOYEE':
            history.push('/employees');
            break;
          default:
            history.push('/');
        }
      }
    }
  };
  return (
    <div>
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
  );
};

export default Login;
