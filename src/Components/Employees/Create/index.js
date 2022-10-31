import { useState } from 'react';
import styles from './create.module.css';

const CreateNewEmployee = ({ render }) => {
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    dni: '',
    location: ''
  });

  const editOnDB = async () => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newEmployee })
      });
      const response = await request.json();
      openAlert(response);
    } catch (error) {
      openAlert(error);
    }
  };

  const openAlert = (res) => {
    console.log(res);
    render(0); // inside modal
  };

  return (
    <section name="editForm" className={styles.section}>
      {/* <Modal
        modalState={modalState}
        closeAlert={closeAlert}
        editEmployee={editEmployee}
        employee={employee}
      /> */}
      <form className={styles.form}>
        <div className={styles.container}>
          <div className={styles.item}>
            <label htmlFor="firstName">Name</label>
            <input
              type="text"
              id="firstName"
              className={styles.input}
              value={newEmployee.firstName}
              onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className={styles.input}
              value={newEmployee.lastName}
              onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className={styles.input}
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="dni">D.N.I.</label>
            <input
              type="text"
              id="dni"
              className={styles.input}
              value={newEmployee.dni}
              onChange={(e) => setNewEmployee({ ...newEmployee, dni: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              className={styles.input}
              value={newEmployee.phone}
              onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="address">Location</label>
            <input
              type="text"
              id="address"
              className={styles.input}
              value={newEmployee.location}
              onChange={(e) => setNewEmployee({ ...newEmployee, location: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={newEmployee.password}
              onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
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
              Create
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
