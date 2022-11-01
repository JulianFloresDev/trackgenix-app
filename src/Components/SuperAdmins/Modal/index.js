import styles from './modal.module.css';

function Modal({ showModal, closeModal, modalTitle, modalMessage }) {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2>{modalTitle}</h2>
        <p>{modalMessage}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
