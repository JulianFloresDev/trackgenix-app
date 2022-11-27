import { useDispatch } from 'react-redux';
import { setModalContent, setShowModal } from 'redux/global/actions';
import styles from './modal.module.css';

const Modal = ({ children, showModal }) => {
  const dispatch = useDispatch();
  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <div>
          <div
            onClick={() => {
              dispatch(setShowModal(false));
              dispatch(setModalContent(<></>));
            }}
            className={styles.closeModalBtn}
          >
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
