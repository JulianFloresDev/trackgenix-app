import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { InputForm } from 'Components/Share';
import { joiResolver } from '@hookform/resolvers/joi';
import { signupSchema } from 'Validations/signupSchema';

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const isLoading = useSelector((state) => state.auth.isLoading);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    node: 'onChange',
    resolver: joiResolver(signupSchema)
  });

  const onSubmit = (inputData) => {
    dispatch(createEmployee(inputData));
  };

  return (
    <div>
      <h2>Register Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          element={'firstName'}
          label={'First Name'}
          inputType={'text'}
          register={register}
          error={errors.firstName?.message}
        />
        <InputForm
          element={'lastName'}
          label={'Last Name'}
          inputType={'text'}
          register={register}
          error={errors.lastName?.message}
        />
        <InputForm
          element={'email'}
          label={'Email'}
          inputType={'email'}
          register={register}
          error={errors.email?.message}
        />
        <InputForm
          element={'password'}
          label={'Password'}
          inputType={'password'}
          register={register}
          error={errors.password?.message}
        />
        <InputForm
          element={'dni'}
          label={'D.N.I.'}
          inputType={'number'}
          register={register}
          error={errors.dni?.message}
        />
        <InputForm
          element={'phone'}
          label={'Phone'}
          inputType={'phone'}
          register={register}
          error={errors.phone?.message}
        />
        <InputForm
          element={'location'}
          label={'Address'}
          inputType={'text'}
          register={register}
          error={errors.location?.message}
        />
        <div>
          <button type="submit">Submit</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
