import styles from './tableHeader.module.css';
const TableHeader = ({ list, setItemList }) => {
  const filterEmployees = (event) => {
    setItemList(
      list.filter((element) => {
        element.description &&
          element.description.toLowerCase().includes(event.target.value.toLowerCase());
        element.name && element.name.toLowerCase().includes(event.target.value.toLowerCase());
        element.firstName &&
          (element.firstName.toLowerCase().includes(event.target.value.toLowerCase()) ||
            element.lastName.toLowerCase().includes(event.target.value.toLowerCase()));
      })
    );
  };
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <label htmlFor="input-search">
          <span className="material-symbols-outlined icon-search" id="icon-search">
            Search
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
    </div>
  );
};

export default TableHeader;
