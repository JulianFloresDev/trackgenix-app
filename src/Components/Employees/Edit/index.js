// import Modal from '../Modal';
import { useState } from 'react';
import styles from './edit.module.css';

const EditEmployeeModal = ({ render, employee }) => {
  const [employeeToEdit, changeEmployeeEdited] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    dni: employee.dni.toString(),
    phone: employee.phone.toString(),
    location: employee.location,
    password: employee.password
  });

  const editOnDB = async (id) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...employeeToEdit })
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
              value={employeeToEdit.firstName}
              onChange={(e) =>
                changeEmployeeEdited({ ...employeeToEdit, firstName: e.target.value })
              }
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className={styles.input}
              value={employeeToEdit.lastName}
              onChange={(e) =>
                changeEmployeeEdited({ ...employeeToEdit, lastName: e.target.value })
              }
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className={styles.input}
              value={employeeToEdit.email}
              onChange={(e) => changeEmployeeEdited({ ...employeeToEdit, email: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="dni">D.N.I.</label>
            <input
              type="text"
              id="dni"
              className={styles.input}
              value={employeeToEdit.dni}
              onChange={(e) => changeEmployeeEdited({ ...employeeToEdit, dni: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              className={styles.input}
              value={employeeToEdit.phone}
              onChange={(e) => changeEmployeeEdited({ ...employeeToEdit, phone: e.target.value })}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="address">Location</label>
            <input
              type="text"
              id="address"
              className={styles.input}
              value={employeeToEdit.location}
              onChange={(e) =>
                changeEmployeeEdited({ ...employeeToEdit, location: e.target.value })
              }
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={employeeToEdit.password}
              onChange={(e) =>
                changeEmployeeEdited({ ...employeeToEdit, password: e.target.value })
              }
            />
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.editBtn}
              onClick={(e) => {
                e.preventDefault();
                editOnDB(employee._id);
              }}
            >
              Edit
            </button>
            <button
              className={styles.closeBtn}
              onClick={(e) => {
                e.preventDefault();
                render(0);
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

export default EditEmployeeModal;
