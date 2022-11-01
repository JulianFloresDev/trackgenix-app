import styles from './table.module.css';

const Table = ({ deleteEmployee, render, list, filter }) => {
  const editEmployee = async (element) => {
    filter(element._id);
    render(2);
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.header}>
          <th>Employee</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th className={styles.createBtn} onClick={() => render(1)}>
            Add New
          </th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {list.map((element) => {
          return (
            <tr key={element._id} className={styles.row}>
              <td>
                {element.firstName} {element.lastName}
              </td>
              <td>{element.email}</td>
              <td>{element.phone}</td>
              <td>{element.location}</td>
              <td className={styles.buttons}>
                <button className={styles.editBtn} onClick={() => editEmployee(element)}>
                  Edit
                </button>
                <button className={styles.deleteBtn} onClick={() => deleteEmployee(element._id)}>
                  x
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
