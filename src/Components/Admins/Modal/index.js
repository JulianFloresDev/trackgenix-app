import styles from './modal.module.css';

function Modal({ showModal, closeModal }) {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div>Modal</div>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
