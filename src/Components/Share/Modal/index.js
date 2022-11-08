import React from 'react';
import styles from './modal.module.css';

const Modal = ({ children, showModal, closeModal }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <button
          onClick={(e) => {
            e.preventDefault();
            closeModal();
          }}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
