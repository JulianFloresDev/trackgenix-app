import styles from './addHours.module.css';

const AddHours = () => {
  return (
    <div className={styles.container}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/watch.svg`}
        className={styles.addHoursBtn}
        onClick={(e) => {
          e.preventDefault();
        }}
      />
    </div>
  );
};

export default AddHours;
