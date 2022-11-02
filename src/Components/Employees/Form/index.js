import { useState } from 'react';
import styles from './create.module.css';
import Modal from '../Modal';

const CreateNewEmployee = ({ render, modalState, setModalState, employee, METHOD, buttonMsg }) => {
  const [modalData, setModalData] = useState({});
  const [employeeToDB, setEmployee] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    dni: employee.dni.toString(),
    phone: employee.phone.toString(),
    location: employee.location,
    password: employee.password
  });

  const editOnDB = async () => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/employees/${employee._id}`, {
        method: METHOD,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...employeeToDB })
      });
      const response = await request.json();
      openAlert(response);
    } catch (error) {
      openAlert(error);
    }
  };

  const openAlert = (res) => {
    setModalData(res);
    setModalState(true);
  };

  return (
    <section name="editForm" className={styles.section}>
      {modalState && (
        <Modal
          modalState={modalState}
          setModalState={setModalState}
          modalData={modalData}
          render={render}
        />
      )}
      <form className={styles.form}>
        <div className={styles.container}>
          <div className={styles.item}>
            <label htmlFor="firstName">Name</label>
            <input
              type="text"
              id="firstName"
              className={styles.input}
              value={employeeToDB.firstName}
              onChange={(e) => setEmployee({ ...employeeToDB, firstName: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className={styles.input}
              value={employeeToDB.lastName}
              onChange={(e) => setEmployee({ ...employeeToDB, lastName: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className={styles.input}
              value={employeeToDB.email}
              onChange={(e) => setEmployee({ ...employeeToDB, email: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="dni">D.N.I.</label>
            <input
              type="text"
              id="dni"
              className={styles.input}
              value={employeeToDB.dni}
              onChange={(e) => setEmployee({ ...employeeToDB, dni: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              className={styles.input}
              value={employeeToDB.phone}
              onChange={(e) => setEmployee({ ...employeeToDB, phone: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="address">Location</label>
            <input
              type="text"
              id="address"
              className={styles.input}
              value={employeeToDB.location}
              onChange={(e) => setEmployee({ ...employeeToDB, location: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={employeeToDB.password}
              onChange={(e) => setEmployee({ ...employeeToDB, password: e.target.value })}
            />
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.editBtn}
              onClick={(e) => {
                e.preventDefault();
                editOnDB();
              }}
            >
              {buttonMsg}
            </button>
            <button
              className={styles.closeBtn}
              onClick={(e) => {
                e.preventDefault();
                render(0);
                // changeState(!modalState);
                // closeModal();
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

export default CreateNewEmployee;
