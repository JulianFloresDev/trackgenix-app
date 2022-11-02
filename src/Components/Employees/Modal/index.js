import styles from './modal.module.css';

const Modal = ({ modalState, setModalState, render }) => {
  if (!modalState) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Modal</h3>
        <div>Mensaje</div>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              setModalState(false);
              render(0);
              // action();
              // editEmployee({
              //   _id: employee._id,
              //   firstName: inputName,
              //   lastName: inputLastName,
              //   email: inputEmail,
              //   phone: inputPhone,
              //   location: inputAddress
              // });
            }}
          >
            Accept
          </button>
          <button type="button" className={styles.button} onClick={() => setModalState(false)}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
