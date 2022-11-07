import styles from './modal.module.css';

const Modal = ({ modalData, modalState, setModalState, render, METHOD }) => {
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
  const finalSuccessMessage = () => {
    if (METHOD === 'POST') {
      return <li>Employee Created Successfully!!</li>;
    }
    return <li>Employee Edited Correctly!</li>;
  };
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Modal</h3>
        <ul>
          {Array.isArray(modalData.message)
            ? modalData.message.map((errors) => {
                return <li key={errors.indexOf}>{errors.message}</li>;
              })
            : finalSuccessMessage()}
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
        </div>
      </div>
    </div>
  );
};

export default Modal;
