import styles from './modal.module.css';

function Modal({ showModal, closeModal, modalResponse }) {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2>{modalResponse.modalTittle}</h2>
        <p>{modalResponse.modalMessage}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
