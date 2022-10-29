import styles from './input.module.css';

const Input = ({ filterEmployees }) => {
  return (
    <div className={styles.container}>
      <label htmlFor="input-search">
        <span className="material-symbols-outlined icon-search" id="icon-sreach">
          search
        </span>
      </label>
      <input
        type="text"
        placeholder="Search . . ."
        className={styles.input}
        id="input-search"
        onChange={filterEmployees}
      ></input>
    </div>
  );
};

export default Input;
