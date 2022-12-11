import styles from './addHours.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { formSchema } from 'Validations/formSchema';
import { InputForm, SelectForm } from 'Components/Share';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTimesheets } from 'redux/time-sheets/thunks';
import { getTasks } from 'redux/tasks/thunks';

const AddHours = ({ project }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.global);

  const { list: tasksList } = useSelector((store) => store.tasks);
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    node: 'onChange',
    resolver: joiResolver(formSchema)
  });

  useEffect(() => {
    dispatch(getTasks(''));
  }, []);

  const createNewTimesheet = (data) => {
    const body = {
      ...data,
      project: project,
      employee: user._id
    };
    dispatch(createTimesheets(body));
  };

  return (
    <form onSubmit={handleSubmit(createNewTimesheet)} className={styles.formContainer}>
      <div className={styles.dataContainer}>
        <div className={styles.leftContainer}>
          <InputForm
            element={'hours'}
            label={'Hours'}
            inputType={'number'}
            register={register}
            error={errors.hours?.message}
          />
          <SelectForm
            element={'task'}
            label={'Tasks'}
            selectOptions={tasksList}
            register={register}
            error={errors.task?.message}
          />
          <InputForm
            element={'date'}
            label={'Date'}
            inputType={'date'}
            register={register}
            error={errors.date?.message}
          />
        </div>
        <div className={styles.rigthContainer}>
          <div className={styles.flexContainer}>
            <label htmlFor={'description'} className={styles.flexLabel}>
              Description
            </label>
            <textarea
              id={'description'}
              placeholder={'Enter a description'}
              className={styles.textarea}
              {...register('description')}
            />
            <p className={styles.errorMessage}>{errors.description?.message}</p>
          </div>
        </div>
      </div>
      <div className={styles.butonContainer}>
        <button type="submit" className={styles.confirmBtn}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default AddHours;
