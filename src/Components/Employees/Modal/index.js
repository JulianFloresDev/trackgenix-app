import styles from './modal.module.css';

const Modal = ({ modalData, modalState, setModalState, render }) => {
  console.log(modalData.message);
  if (!modalState) {
    return null;
  }
  const closeModal = () => {
    if (!modalData.error) {
      render(0);
    }
    setModalState(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Modal</h3>
        <ul>
          {typeof modalData.message !== 'string' ? (
            modalData.message.map((errors) => {
              return <li key={errors.indexOf}>{errors.message}</li>;
            })
          ) : (
            <li>{modalData.message.slice(0, -32)}</li>
          )}
        </ul>
        <div>
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              closeModal();
            }}
          >
            Close
          </button>
          {/* <button type="button" className={styles.button} onClick={() => setModalState(false)}>
            Reject
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
