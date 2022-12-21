import styles from './notFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <img src={`${process.env.PUBLIC_URL}/assets/images/not-found.jpg`} />
      <div className={styles.info}>
        <h3>Posible Server Connection!!</h3>
        <p>Try again, or contact us if error persist!</p>
      </div>
    </div>
  );
};

export default NotFound;
