import styles from './table.module.css';
import { useHistory } from 'react-router-dom';
const Table = ({ headers, data }) => {
  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const entitie = URLPath[1];
  console.log(data);
  const deleteRow = () => {
    console.log('Open Modal Component');
  };
  return (
    <>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              {headers.map((header, index) => {
                return <td key={index}>{header}</td>;
              })}
              <td>
                <button className={styles.addBtn}>Add new {entitie}</button>
              </td>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr key={row._id}>
                  {headers.map((header, index) => {
                    if (typeof row[header] === 'string') {
                      if (
                        header.includes('Date') ||
                        header.includes('atedAt') ||
                        header.includes('date')
                      ) {
                        row[header] = row[header].substring(0, 10);
                      }
                      return <td key={index}>{row[header]}</td>;
                    }
                    if (Array.isArray(row[header])) {
                      return (
                        <td key={index}>
                          <ul>
                            {row[header].map((item) => {
                              if (item.employee !== null) {
                                return (
                                  <li key={item._id}>
                                    {item.employee.firstName} {item.employee.lastName} {item.role}{' '}
                                    {item.rate}
                                  </li>
                                );
                              }
                              return (
                                <li key={item._id} className={styles.optionInvalid}>
                                  Employee Not Found!
                                </li>
                              );
                            })}
                          </ul>
                        </td>
                      );
                    }
                    return (
                      <td key={index} className={styles.optionInvalid}>
                        {row[header].description && row[header].description}
                        {row[header].name && row[header].name}
                        {row[header].firstName && row[header].firstName} {row[header].lastName}
                        Element Not Found!
                      </td>
                    );
                  })}
                  <td className={styles.buttonsContainer}>
                    <button
                      className={styles.editBtn}
                      onClick={() => history.push(`/${entitie}/form/${row._id}`)}
                    >
                      Edit
                    </button>
                    <button className={styles.closeBtn} onClick={deleteRow}>
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
