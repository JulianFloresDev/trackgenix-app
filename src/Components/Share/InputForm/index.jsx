import styles from './inputForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { editItem } from '../../../redux/global/actions';

export const InputForm = ({ element, label, error, inputType }) => {
  const dispatch = useDispatch();
  const { itemToPUT } = useSelector((state) => state.global);

  return (
    <div className={styles.flexContainer}>
      {label && (
        <label htmlFor={element} className={styles.flexLabel}>
          {label}
        </label>
      )}
      <input
        className={styles.flexImput}
        id={element}
        type={inputType}
        value={inputType === 'date' ? itemToPUT[element].substring(0, 10) : itemToPUT[element]}
        checked={inputType === 'checkbox' && itemToPUT[element]}
        onChange={(e) => {
          e.target.type === 'checkbox'
            ? (itemToPUT[element] = e.target.checked)
            : (itemToPUT[element] = e.target.value);
          dispatch(editItem({ ...itemToPUT }));
        }}
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
