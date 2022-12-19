import styles from './search.module.css';
import { useDispatch } from 'react-redux';
import { setFilterData } from 'redux/global/actions';

const Search = ({ list }) => {
  const dispatch = useDispatch();

  const filterData = (inputValue) => {
    dispatch(
      setFilterData(
        list.filter((element) => {
          return (
            element.firstName?.toLowerCase().includes(inputValue.toLowerCase()) ||
            element.lastName?.toLowerCase().includes(inputValue.toLowerCase()) ||
            element.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
            element.email?.toLowerCase().includes(inputValue.toLowerCase()) ||
            element.date?.toLowerCase().includes(inputValue.toLowerCase())
          );
        })
      )
    );
  };

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
        onChange={(e) => {
          filterData(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
