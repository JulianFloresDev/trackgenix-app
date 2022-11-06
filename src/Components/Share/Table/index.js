import { useState } from 'react';
import styles from './table.module.css';
import TableHeader from '../TableHeader';
const Table = ({ headers, data }) => {
  const [itemList, setItemList] = useState([]);
  return (
    <>
      <div className={styles.container}>
        <TableHeader list={itemList} setItemList={setItemList} />
        <table className={styles.table}>
          <thead>
            <tr>
              {headers.map((header, index) => {
                return <td key={index}>{header}</td>;
              })}
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => {
              console.log(element);
              return (
                <tr key={element._id}>
                  {headers.map((header, index) => {
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
                              if (item.employee !== null) {
                                return (
                                  <option key={item._id}>
                                    {item.employee.firstName} {item.employee.lastName} {item.role}{' '}
                                    {item.rate}
                                  </option>
                                );
                              }
                              return (
                                <option key={item._id} className={styles.optionInvalid}>
                                  Employee Not Found!
                                </option>
                              );
                            })}
                          </select>
                        </td>
                      );
                    }
                    return (
                      <td key={index} className={styles.optionInvalid}>
                        Element Not Found!
                      </td>
                    );
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
      </div>
    </>
  );
};

export default Table;
