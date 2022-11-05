import styles from './table.module.css';
const Table = (props) => {
  console.log(props.data);
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {props.headers.map((header, index) => {
            return <td key={index}>{header}</td>;
          })}
        </tr>
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
                          return (
                            <option key={item._id}>
                              {item.employee.firstName} {item.employee.lastName} {item.role}{' '}
                              {item.rate}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  );
                }
              })}
              <td className={styles.buttonsContainer}>
                <button>Edit</button>
                <button>X</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
