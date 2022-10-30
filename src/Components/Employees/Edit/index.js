import { useState } from 'react';
import styles from './edit.module.css';

const EditEmployeeModal = ({ employee, closeModal, editEmployee }) => {
  const [inputName, changeInputName] = useState(`${employee.firstName}`);
  const [inputLastName, changeInputLastName] = useState(`${employee.lastName}`);
  const [inputEmail, changeInputEmail] = useState(`${employee.email}`);
  const [inputPhone, changeInputPhone] = useState(`${employee.phone}`);
  const [inputAddress, changeInputAddress] = useState(`${employee.location}`);

  const changeInput = (e) => {
    switch (e.target.id) {
      case 'firstName':
        changeInputName(e.target.value);
        break;
      case 'lastName':
        changeInputLastName(e.target.value);
        break;
      case 'email':
        changeInputEmail(e.target.value);
        break;
      case 'phone':
        changeInputPhone(e.target.value);
        break;
      case 'address':
        changeInputAddress(e.target.value);
        break;
      default:
        break;
    }
  };
  return (
    <form className={styles.form}>
      <div className={styles.container}>
        <div className={styles.item}>
          <label htmlFor="input-name">Name</label>
          <input id="firstName" className={styles.input} value={inputName} onChange={changeInput} />
        </div>
        <div className={styles.item}>
          <label htmlFor="input-lastName">Last Name</label>
          <input
            id="lastName"
            className={styles.input}
            value={inputLastName}
            onChange={changeInput}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="input-email">Email</label>
          <input id="email" className={styles.input} value={inputEmail} onChange={changeInput} />
        </div>
        <div className={styles.item}>
          <label htmlFor="input-phone">Phone</label>
          <input id="phone" className={styles.input} value={inputPhone} onChange={changeInput} />
        </div>
        <div className={styles.item}>
          <label htmlFor="input-address">Location</label>
          <input
            id="address"
            className={styles.input}
            value={inputAddress}
            onChange={changeInput}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={() =>
            editEmployee({
              _id: employee._id,
              firstName: inputName,
              lastName: inputLastName,
              email: inputEmail,
              phone: inputPhone,
              location: inputAddress
            })
          }
        >
          Edit
        </button>
        <button className={styles.button} onClick={() => closeModal()}>
          Close
        </button>
      </div>
    </form>
  );
};

export default EditEmployeeModal;
