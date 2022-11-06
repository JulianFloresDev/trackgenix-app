import styles from './table.module.css';
const Table = (props) => {
  return (
    <table className={styles.table}>
      <thead>
        <th>
          {props.headers.map((header, index) => {
            return <td key={index}>{header}</td>;
          })}
        </th>
      </thead>
      <tbody>
        {props.data.map((element) => {
          return (
            <tr key={element._id}>
              {props.headers.map((header, index) => {
                if (typeof element[header] === 'string') {
                  if (element[header].includes('date')) {
                    element[header].substring(10);
                  }
                  return <td key={index}>{element[header]}</td>;
                }
                if (Array.isArray(element[header])) {
                  return (
                    <td key={index}>
                      <select>
                        {element[header].map((item) => {
                          const itemKeys = Object.entries(item);
                          console.log(itemKeys);
                          if (item !== null) {
                            return (
                              <option key={item._id}>
                                {/* {item.employee.firstName} {item.employee.lastName} {item.role}{' '} */}
                                {item.rate}
                              </option>
                            );
                          }
                          return (
                            <option key={item._id} className={styles.optionInvalid}>
                              Element Not Found!
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  );
                }
              })}
              <td className={styles.buttonsContainer}>
                <button className={styles.editBtn}>Edit</button>
                <button className={styles.closeBtn}>X</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
