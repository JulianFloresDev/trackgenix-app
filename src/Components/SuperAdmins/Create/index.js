import { useState } from 'react';
import Modal from '../Modal';
import styles from './create.module.css';

const SuperAdminsCreate = ({
  changeShow,
  showModal,
  setShowModal,
  closeModal,
  setModalMessage,
  setModalTitle,
  modalTitle,
  modalMessage
}) => {
  const [firstName, saveFirstName] = useState();
  const [lastName, saveLastName] = useState();
  const [email, saveEmail] = useState();
  const [password, savePassword] = useState();
  const [dni, saveDni] = useState();
  const [phone, savePhone] = useState();
  const [location, saveLocation] = useState();

  const createSuperAdmin = async (superAdmin) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error === false) {
            setModalTitle('Success');
            setModalMessage(res.message);
          } else {
            setModalTitle('Error');
            setModalMessage(res.message[0].message);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.section}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modalTitle={modalTitle}
        modalMessage={modalMessage}
      />
      <form className={styles.form}>
        <div className={styles.container}>
          <div className={styles.item}>
            <label htmlFor="FirstName">First Name</label>
            <input
              type="text"
              id="FirstName"
              className={styles.input}
              placeholder="add First Name"
              onChange={(e) => {
                saveFirstName(e.target.value);
              }}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="LastName">Last Name</label>
            <input
              type="text"
              id="LastName"
              className={styles.input}
              placeholder="add Last Name"
              onChange={(e) => {
                saveLastName(e.target.value);
              }}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              id="Email"
              className={styles.input}
              placeholder="add Email"
              onChange={(e) => {
                saveEmail(e.target.value);
              }}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              id="Password"
              className={styles.input}
              placeholder="add Password"
              onChange={(e) => {
                savePassword(e.target.value);
              }}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="Dni">Dni</label>
            <input
              type="text"
              id="Dni"
              className={styles.input}
              placeholder="add dni"
              onChange={(e) => {
                saveDni(e.target.value);
              }}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="Phone">Phone</label>
            <input
              type="text"
              id="Phone"
              className={styles.input}
              placeholder="add Phone"
              onChange={(e) => {
                savePhone(e.target.value);
              }}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="Location">Location</label>
            <input
              type="text"
              id="Location"
              className={styles.input}
              placeholder="add Location"
              onChange={(e) => {
                saveLocation(e.target.value);
              }}
            />
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.createBtn}
              onClick={(e) => {
                e.preventDefault();
                const newData = {
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password,
                  dni: dni.toString(),
                  phone: phone.toString(),
                  location: location
                };
                createSuperAdmin(newData);
                setShowModal(true);
              }}
            >
              Create New Super Admin
            </button>
            <button
              className={styles.closeBtn}
              onClick={(e) => {
                e.preventDefault();
                changeShow();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SuperAdminsCreate;
