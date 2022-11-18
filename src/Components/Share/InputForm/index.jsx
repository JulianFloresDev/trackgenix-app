import styles from './inputForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { editItem } from '../../../redux/global/actions';

export const InputForm = ({ element, label, error, inputType, selectOptions }) => {
  const dispatch = useDispatch();
  const { itemToPUT } = useSelector((state) => state.global);

  return (
    <div className={styles.flexContainer}>
      {label && (
        <label htmlFor={element} className={styles.flexLabel}>
          {label}
        </label>
      )}
      {inputType && (
        <input
          className={styles.flexImput}
          id={element}
          type={inputType}
          value={itemToPUT[element]}
          onChange={(e) => {
            e.target.type === 'checkbox'
              ? (itemToPUT[element] = e.target.checked)
              : (itemToPUT[element] = e.target.value);
            dispatch(editItem({ ...itemToPUT }));
          }}
        ></input>
      )}
      {selectOptions && (
        <select
          className={styles.flexSelect}
          name={element}
          value={itemToPUT[element] ? itemToPUT[element]._id : 0}
          onChange={(e) => {
            itemToPUT[element] = e.target.value;
            dispatch(editItem({ ...itemToPUT }));
          }}
        >
          {selectOptions.map((option, index) => {
            return (
              <option key={index} value={option?._id}>
                {option?.firstName && option.firstName + ' ' + option.lastName}
                {(option?.name && option.name) || option?.description}
              </option>
            );
          })}
        </select>
      )}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};
