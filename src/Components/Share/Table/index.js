import styles from './table.module.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal';
const Table = ({ headers, data }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const entitie = URLPath[1];
  return (
    <>
      <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
        {modalContent}
      </Modal>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              {headers.map((header, index) => {
                return <td key={index}>{header}</td>;
              })}
              <td>
                <button
                  className={styles.addBtn}
                  onClick={() => history.push(`/${entitie}/form/0`)}
                >
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
                    if (typeof row[property] === ('string' || 'number')) {
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
                          <button className={styles.showListBtn}>Show List</button>
                        </td>
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
                    <button
                      className={styles.editBtn}
                      onClick={() => {
                        /*  Verdadera función del botón */
                        // history.push(`/${entitie}/form/${row._id}`);

                        /*  Caso de práctica que posteriormente debe ser borrado */
                        setModalContent(
                          <>
                            Do you want to edit?
                            <div>
                              <button
                                onClick={() => {
                                  setShowModal(false);
                                  history.push(`/${entitie}/form/${row._id}`);
                                }}
                              >
                                Yes
                              </button>
                              <button onClick={() => setShowModal(false)}>No</button>
                            </div>
                          </>
                        );
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.closeBtn}
                      onClick={() => {
                        setModalContent(
                          <>
                            Are you sure?
                            <div>
                              <button onClick={() => setShowModal(false)}>Yes</button>
                              <button onClick={() => setShowModal(false)}>No</button>
                            </div>
                          </>
                        );
                        setShowModal(true);
                      }}
                    >
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
