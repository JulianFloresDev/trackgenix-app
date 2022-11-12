import styles from './table.module.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal';

const Table = ({ headers, data }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const [items, setItems] = useState(data);
  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const entitie = URLPath[1];

  const deleteItem = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/${entitie}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setModalContent(<>Deleted successfully</>);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
    setItems(items.filter((item) => item._id !== id));
  };
  return (
    <>
      <Modal showModal={showModal}>{modalContent}</Modal>
      <div className={styles.container}>
        <h2>{entitie}</h2>
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                {headers.map((header, index) => {
                  return <th key={index}>{header}</th>;
                })}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => {
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
                      if (typeof row[property] === 'string' || typeof row[property] === 'number') {
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
                          <>
                            <td key={index}>
                              <button
                                className={styles.showListBtn}
                                onClick={(e) => {
                                  e.preventDefault();
                                  let counter = 0;

                                  row[property].forEach((team) => {
                                    team.employee !== null && counter++;
                                  });

                                  if (counter !== row[property].length) {
                                    setModalContent(
                                      <p>This project does not have work team, yet!</p>
                                    );
                                    setShowModal(true);
                                    setTimeout(() => {
                                      setShowModal(false);
                                    }, 2000);
                                  } else {
                                    setModalContent(
                                      <>
                                        <table>
                                          <thead>
                                            <tr>
                                              <th>Employee</th>
                                              <th>Role</th>
                                              <th>Rate</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {row[property].map((team, index) => {
                                              if (team.employee !== null) {
                                                return (
                                                  <tr key={index}>
                                                    <td>{`${team.employee.firstName} ${team.employee.lastName}`}</td>
                                                    <td>{team.role}</td>
                                                    <td>{team.rate}</td>
                                                  </tr>
                                                );
                                              }
                                            })}
                                          </tbody>
                                        </table>
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setShowModal(false);
                                          }}
                                        >
                                          Go back
                                        </button>
                                      </>
                                    );
                                    setShowModal(true);
                                  }
                                }}
                              >
                                Show List
                              </button>
                            </td>
                          </>
                        );
                      }
                      if (!row[property]) {
                        return <td>Element Not Found</td>;
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
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/edit.svg`}
                        className={styles.editBtn}
                        onClick={() => {
                          history.push(`/${entitie}/form/${row._id}`);
                        }}
                      />
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`}
                        className={styles.closeBtn}
                        onClick={() => {
                          setShowModal(true);
                          setModalContent(
                            <>
                              Are you sure?
                              <div>
                                <button onClick={() => deleteItem(row._id)}>Yes</button>
                                <button onClick={() => setShowModal(false)}>No</button>
                              </div>
                            </>
                          );
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/add.svg`}
            onClick={() => history.push(`/${entitie}/new`)}
          />
        </div>
      </div>
    </>
  );
};

export default Table;
