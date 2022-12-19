import styles from './search.module.css';

const Search = () => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="inputSearch">
        <img src={`${process.env.PUBLIC_URL}/assets/images/search.svg`} alt="Search icon" />
      </label>
      <input
        id="inputSearch"
        className={styles.input}
        type="text"
        placeholder="Filter search by. . ."
      />
    </div>
  );
};

export default Search;
