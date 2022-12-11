import styles from './addHours.module.css';
import store from 'redux/store';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { formSchema } from 'Validations/formSchema';
import { setShowModal, setModalContent } from 'redux/global/actions';
import { InputForm, SelectForm } from 'Components/Share';

const AddHours = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    node: 'onChange',
    resolver: joiResolver(formSchema)
  });

  const createNewTimesheet = (data) => {
    console.log(data);
  };

  const openModal = () => {
    store.dispatch(
      setModalContent(
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
                selectOptions={[]}
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
              <SelectForm
                element={'project'}
                label={'Project'}
                selectOptions={[]}
                register={register}
                error={errors.project?.message}
              />
            </div>
          </div>
          <div className={styles.butonContainer}>
            <button type="submit" className={styles.confirmBtn}>
              Confirm
            </button>
          </div>
        </form>
      )
    );
    store.dispatch(setShowModal(true));
  };

  return (
    <div className={styles.container}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/watch.svg`}
        className={styles.addHoursBtn}
        onClick={() => {
          openModal();
        }}
      />
    </div>
  );
};

export default AddHours;
