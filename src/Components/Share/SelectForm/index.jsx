import styles from './selectForm.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { editItem } from '../../../redux/global/actions';
// import { useSelector } from 'react-redux';

export const SelectForm = ({ register, element, label, selectOptions, error }) => {
  // const dispatch = useDispatch();
  // const { itemToPUT } = useSelector((state) => state.global);

  return (
    <div className={styles.flexContainer}>
      {label && (
        <label htmlFor={element} className={styles.flexLabel}>
          {label}
        </label>
      )}
      <select
        {...register(element)}
        className={styles.flexSelect}
        id={element}
        name={element}
        // value={itemToPUT[element] ? itemToPUT[element]._id : 0}
        // onChange={(e) => {
        //   itemToPUT[element] = e.target.value;
        //   dispatch(editItem({ ...itemToPUT }));
        // }}
      >
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
