import styles from './profile.module.css';
import modalStyles from 'Components/Share/Modal/modal.module.css';
import { chageUserPassword } from 'helpers/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { editItem, setShowModal, setModalContent } from 'redux/global/actions';
import { InputForm, Modal } from 'Components/Share';
import changePasswordValidation from './changePasswordValidation';

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { list: superAdmins } = useSelector((store) => store.superAdmins);
  const { list: admins } = useSelector((store) => store.admins);
  const { list: employees } = useSelector((store) => store.employees);
  const { role } = useSelector((store) => store.auth);
  const { showModal, modalContent } = useSelector((store) => store.global);
  const email = sessionStorage.getItem('email');

  const user =
    superAdmins.find((users) => users.email === email) ||
    admins.find((users) => users.email === email) ||
    employees.find((users) => users.email === email) ||
    {};

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({ node: 'onBlur', resolver: joiResolver(changePasswordValidation) });

  const userToShow = { ...user };
  delete userToShow['_id'];
  delete userToShow['__v'];
  delete userToShow['createdAt'];
  delete userToShow['updatedAt'];
  delete userToShow['token'];
  delete userToShow['firebaseUid'];

  const confirmChangePassword = (data) => {
    dispatch(
      setModalContent(
        <>
          <h3 className={modalStyles.title}>Are you sure?</h3>
          <p className={modalStyles.info}>
            This action is irreversible, make sure you will remember new password!
          </p>
          <button
            onClick={() => {
              reset();
              chageUserPassword(data.password);
              dispatch(setShowModal(false));
              dispatch(setModalContent(<></>));
            }}
          >
            Confirm Changes
          </button>
          <button
            onClick={() => {
              reset();
              dispatch(setShowModal(false));
              dispatch(setModalContent(<></>));
            }}
          >
            Cancel
          </button>
        </>
      )
    );
  };

  const openModalToChangePssword = () => {
    dispatch(
      setModalContent(
        <div>
          <form onSubmit={handleSubmit(confirmChangePassword)}>
            <InputForm
              register={register}
              element={'password'}
              label={'New password'}
              inputType={'password'}
              error={errors?.password?.message}
            />
            <InputForm
              register={register}
              element={'repeatPassword'}
              label={'Confirm new password'}
              inputType={'password'}
              error={errors?.repeatPassword?.message}
            />
            <button type="submit">Submit Changes</button>
          </form>
        </div>
      )
    );
    dispatch(setShowModal(true));
  };

  const openModalToDeleteAccount = () => {
    dispatch(
      setModalContent(
        <>
          <h3 className={modalStyles.title}>Sure you want to delete your Account on TRACKgenix?</h3>
          <p className={modalStyles.info}>
            This action is irreversible, make sure you will remember new password!
          </p>
          <button
            onClick={() => {
              dispatch(setShowModal(false));
              dispatch(setModalContent(<></>));
            }}
          >
            Confirm Changes
          </button>
          <button
            onClick={() => {
              dispatch(setShowModal(false));
              dispatch(setModalContent(<></>));
            }}
          >
            Cancel
          </button>
        </>
      )
    );
    dispatch(setShowModal(true));
  };

  return (
    <section className={styles.section}>
      <Modal showModal={showModal}>{modalContent}</Modal>
      <div className={styles.container}>
        {Object.keys(userToShow).map((prop, index) => {
          return (
            <div key={index} className={styles.item}>
              <h4 className={styles.itemTitle}>{prop.toUpperCase()} :</h4>
              <p className={styles.itemProp}>{user[prop]}</p>
            </div>
          );
        })}
        <div className={styles.buttonEdit}>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(editItem(user));
              history.push(`/${role}s/form/${user._id}?editProfile=true`);
            }}
          >
            Edit Profile
          </button>
          <button
            className={styles.buttonChangePassword}
            onClick={() => openModalToChangePssword()}
          >
            Change Password
          </button>
          <button className={styles.deleteAccountBtn} onClick={() => openModalToDeleteAccount()}>
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
