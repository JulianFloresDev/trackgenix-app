import styles from './selectForm.module.css';

const SelectForm = ({ register, element, label, selectOptions, error }) => {
  return (
    <div className={styles.flexContainer}>
      {label && (
        <label htmlFor={element} className={styles.flexLabel}>
          {label}
        </label>
      )}
      <select {...register(element)} className={styles.flexSelect} id={element} name={element}>
        <option hidden>{`Select ${element}`}</option>
        {selectOptions
          .sort((a, b) => {
            if (a.firstName) {
              return a?.firstName > b?.firstName ? 1 : a?.firstName < b?.firstName ? -1 : 0;
            }
            if (a.name) {
              return a?.name > b?.name ? 1 : a?.name < b?.name ? -1 : 0;
            }
            if (a.type) {
              return a?.type > b?.type ? 1 : a?.type < b?.type ? -1 : 0;
            }
          })
          .map((option, index) => {
            return (
              <option key={index} value={option?._id}>
                {option?.firstName && option.firstName + ' ' + option.lastName}
                {(option?.name && option.name) || option?.description || option?.type}
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

export default SelectForm;
