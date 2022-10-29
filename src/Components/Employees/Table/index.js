import styles from './table.module.css';

const Table = ({ list, deleteEmployee }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.th}>
          <th>Employee</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Adress</th>
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
              <td>
                <button onClick={() => deleteEmployee(element._id)}>Delete</button>
                <button>Edit</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
