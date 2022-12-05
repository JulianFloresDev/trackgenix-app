import styles from './signup.module.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { signupSchema } from 'Validations/signupSchema';
import { InputForm } from 'Components/Share';
import { createEmployee } from 'redux/employees/thunks';

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();

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
    <section className={styles.sectionContainer}>
      <h2>Register New Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
        <div className={styles.btnContainer}>
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
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
    </section>
  );
};

export default SignUp;
