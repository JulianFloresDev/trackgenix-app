import styles from './time-sheets.module.css';

function SuccessModal(props) {
  return (
    <div className={styles.modal}>
      <h2 className={styles.modalContent}>{props.successMessage}</h2>
    </div>
  );
}

export default SuccessModal;
