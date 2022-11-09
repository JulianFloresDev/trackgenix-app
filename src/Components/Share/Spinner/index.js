import styles from './spinner.module.css';

const Spinner = ({ entitie }) => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}></div>
      <h2>Loading {`${entitie}`}</h2>
    </div>
  );
};

export default Spinner;
