import styles from './table.module.css';
import { useHistory } from 'react-router-dom';
// import Modal from '../Modal';
const Table = ({ headers, data, setList }) => {
  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const entitie = URLPath[1];
  const deleteRow = () => {
    setList([]);
    console.log('Open Modal Component');
  };
  const openListModal = (list) => {
    console.log('Open Modal Component with employee List:', list);
  };
  return (
    <>
      {/* <Modal updateList={updateList}>
        <></>
      </Modal> */}
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              {headers.map((header, index) => {
                return <td key={index}>{header}</td>;
              })}
              <td>
                <button className={styles.addBtn} onClick={() => history.push(`/${entitie}/form`)}>
                  Add new {entitie}
                </button>
              </td>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr key={row._id}>
                  {headers.map((property, index) => {
                    if (typeof row[property] === 'boolean') {
                      if (row[property]) {
                        return <td key={index}>Active</td>;
                      } else {
                        return <td key={index}>Finish</td>;
                      }
                    }
                    if (typeof row[property] === 'string') {
                      if (
                        property.includes('Date') ||
                        property.includes('atedAt') ||
                        property.includes('date')
                      ) {
                        row[property] = row[property].substring(0, 10);
                      }
                      return <td key={index}>{row[property]}</td>;
                    }
                    if (Array.isArray(row[property])) {
                      return (
                        <td key={index}>
                          <button
                            className={styles.showListBtn}
                            onClick={() => openListModal(row[property])}
                          >
                            Show List
                          </button>
                          {/* <ul>
                            {row[property].map((item) => {
                              console.log(row[property]);
                              if (item.employee !== null) {
                                return (
                                  <>
                                    <li key={item._id}>
                                      {item.employee.firstName} {item.employee.lastName}
                                    </li>
                                  </>
                                );
                              }
                              return (
                                <li key={item._id} className={styles.optionInvalid}>
                                  Employee Not Found!
                                </li>
                              );
                            })}
                          </ul> */}
                        </td>
                      );
                    }
                    return (
                      <td key={index} className={styles.optionInvalid}>
                        {row[property].description && row[property].description}
                        {row[property].name && row[property].name}
                        {row[property].firstName && row[property].firstName}{' '}
                        {row[property].lastName}
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
