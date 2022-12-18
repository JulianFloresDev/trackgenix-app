import styles from './inputForm.module.css';

const InputForm = ({ register, element, label, error, inputType }) => {
  return (
    <div className={styles.flexContainer}>
      {label && (
        <label htmlFor={element} className={styles.flexLabel}>
          {label}
        </label>
      )}
      <input
        {...register(element)}
        className={styles.flexImput}
        id={element}
        type={inputType}
      ></input>
      {error && Array.isArray(error) ? (
        <ul className={styles.errorMessage}>
          {error.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      ) : (
        <p className={styles.errorMessage}>{error}</p>
      )}
    </div>
  );
};

export default InputForm;
