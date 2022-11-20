import styles from './selectForm.module.css';

export const SelectForm = ({ register, element, label, selectOptions, error }) => {
  return (
    <div className={styles.flexContainer}>
      {label && (
        <label htmlFor={element} className={styles.flexLabel}>
          {label}
        </label>
      )}
      <select {...register(element)} className={styles.flexSelect} id={element} name={element}>
        <option hidden>{`Select ${element}`}</option>
        {selectOptions.map((option, index) => {
          return (
            <option key={index} value={option?._id}>
              {option?.firstName && option.firstName + ' ' + option.lastName}
              {(option?.name && option.name) || option?.description}
            </option>
          );
        })}
      </select>
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
