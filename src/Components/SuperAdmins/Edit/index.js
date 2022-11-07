import { useState } from 'react';
import Modal from '../Modal';
import styles from './edit.module.css';

const SuperAdminsEdit = ({
  SuperAdminsToEdit,
  changeShow,
  showModal,
  setShowModal,
  closeModal,
  setModalMessage,
  setModalTitle,
  modalTitle,
  modalMessage
}) => {
  const [superAdminEdited, setSuperAdminCreated] = useState({
    firstName: SuperAdminsToEdit.firstName,
    lastName: SuperAdminsToEdit.lastName,
    email: SuperAdminsToEdit.email,
    password: SuperAdminsToEdit.password,
    dni: SuperAdminsToEdit.dni.toString(),
    phone: SuperAdminsToEdit.phone.toString(),
    location: SuperAdminsToEdit.location
  });

  const editSuperAdmin = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdminEdited)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error === false) {
            setModalTitle('Success');
            setModalMessage(res.message.toString());
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
      <from className={styles.from}>
        <div className={styles.container}>
          <div className={styles.item}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="add First Name"
              id="firstName"
              className={styles.input}
              value={superAdminEdited.firstName}
              onChange={(e) => {
                setSuperAdminCreated({
                  ...superAdminEdited,
                  firstName: e.target.value
                });
              }}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="add Last Name"
              id="lastName"
              className={styles.input}
              value={superAdminEdited.lastName}
              onChange={(e) => {
                setSuperAdminCreated({
                  ...superAdminEdited,
                  lastName: e.target.value
                });
              }}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="add Email"
              id="email"
              className={styles.input}
              value={superAdminEdited.email}
              onChange={(e) => {
                setSuperAdminCreated({
                  ...superAdminEdited,
                  email: e.target.value
                });
              }}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="add Password"
              id="password"
              className={styles.input}
              value={superAdminEdited.password}
              onChange={(e) => {
                setSuperAdminCreated({
                  ...superAdminEdited,
                  password: e.target.value
                });
              }}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="dni">DNI</label>
            <input
              type="text"
              placeholder="add dni"
              id="dni"
              className={styles.input}
              value={superAdminEdited.dni}
              onChange={(e) => {
                setSuperAdminCreated({
                  ...superAdminEdited,
                  dni: e.target.value
                });
              }}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              placeholder="add Phone"
              id="phone"
              className={styles.input}
              value={superAdminEdited.phone}
              onChange={(e) => {
                setSuperAdminCreated({
                  ...superAdminEdited,
                  phone: e.target.value
                });
              }}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              placeholder="add Location"
              id="location"
              className={styles.input}
              value={superAdminEdited.location}
              onChange={(e) => {
                setSuperAdminCreated({
                  ...superAdminEdited,
                  location: e.target.value
                });
              }}
            />
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.editBtn}
              onClick={(e) => {
                e.preventDefault();
                editSuperAdmin(SuperAdminsToEdit._id);
                setShowModal(true);
              }}
            >
              Save Changes
            </button>
            <button
              className={styles.editBtn}
              onClick={(e) => {
                e.preventDefault();
                changeShow();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </from>
    </section>
  );
};

export default SuperAdminsEdit;
