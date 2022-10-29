import { useState } from 'react';
import styles from './edit.module.css';

const EditEmployeeModal = ({ employee, closeModal, editEmployee }) => {
  const [inputName, changeInputName] = useState(`${employee.firstName}`);
  const [inputLastName, changeInputLastName] = useState(`${employee.lastName}`);
  const [inputEmail, changeInputEmail] = useState(`${employee.email}`);
  const [inputPhone, changeInputPhone] = useState(`${employee.phone}`);
  const [inputAddress, changeInputAddress] = useState(`${employee.location}`);

  const changeName = (e) => {
    changeInputName(e.target.value);
  };
  const changeLastName = (e) => {
    changeInputLastName(e.target.value);
  };
  const changeEmail = (e) => {
    changeInputEmail(e.target.value);
  };
  const changePhone = (e) => {
    changeInputPhone(e.target.value);
  };
  const changeAddress = (e) => {
    changeInputAddress(e.target.value);
  };

  return (
    <form className={styles.container}>
      <input className={styles.input} value={inputName} onChange={changeName} />
      <input className={styles.input} value={inputLastName} onChange={changeLastName} />
      <input className={styles.input} value={inputEmail} onChange={changeEmail} />
      <input className={styles.input} value={inputPhone} onChange={changePhone} />
      <input className={styles.input} value={inputAddress} onChange={changeAddress} />
      <div className={styles.button_container}>
        <button className={styles.button} onClick={() => editEmployee(employee._id)}>
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
