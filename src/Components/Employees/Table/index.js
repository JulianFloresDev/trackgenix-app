import styles from './table.module.css';

const Table = ({ list, deleteEmployee, editEmployee }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.th}>
          <th>Employee</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {list.map((element) => {
          return (
            <tr key={element._id} className={styles.tr}>
              <td className={styles.td}>
                {element.firstName} {element.lastName}
              </td>
              <td className={styles.td}>{element.email}</td>
              <td className={styles.td}>{element.phone}</td>
              <td className={styles.td}>{element.location}</td>
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
