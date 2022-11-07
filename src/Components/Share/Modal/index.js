import React from 'react';
import styles from './modal.module.css';

const Modal = ({ children, closeModal, isOpen }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <button onClick={closeModal} className={styles.closeButton}>
          X
        </button>
        {children}
        <button>y</button>
        <button>z</button>
      </div>
    </div>
  );
};

export default Modal;
