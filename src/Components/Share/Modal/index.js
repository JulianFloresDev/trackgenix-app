import styles from './modal.module.css';

const Modal = ({ children, showModal }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>{children}</div>
    </div>
  );
};

export default Modal;
