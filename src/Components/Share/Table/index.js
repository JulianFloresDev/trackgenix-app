import styles from './table.module.css';
import modalStyles from '../Modal/modal.module.css';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal';
import { useSelector, useDispatch } from 'react-redux';
import { editItem, setModalContent, setShowModal } from '../../../redux/global/actions';
import { deleteTasks } from '../../../redux/tasks/thunks';
import { deleteEmployees } from '../../../redux/employees/thunks';
import { deleteAdminByID } from '../../../redux/admins/thunks';
import { deleteTimesheets } from '../../../redux/time-sheets/thunks';
import { deleteProject } from '../../../redux/projects/thunks';
import { deleteSuperAdmins } from '../../../redux/super-admins/thunks';

const Table = ({ headers, data }) => {
  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const entitie = URLPath[1];
  const { showModal, modalContent } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const openModal = (id) => {
    dispatch(setShowModal(true));
    dispatch(
      setModalContent(
        <>
          <h3 className={modalStyles.title}>
            You are trying to delete some {entitie.slice(0, -1).toUpperCase()}
          </h3>
          <p className={modalStyles.info}>This is an irreversible action. Please confirm.</p>
          <div className={modalStyles.buttonsContainer}>
            <button className={modalStyles.cancelBtn} onClick={() => dispatch(setShowModal(false))}>
              Cancel
            </button>
            <button className={modalStyles.confirmBtn} onClick={() => deleteItem(id)}>
              Submit
            </button>
          </div>
        </>
      )
    );
  };

  const deleteItem = (id) => {
    switch (entitie) {
      case 'employees':
        dispatch(deleteEmployees(id));
        break;
      case 'admins':
        dispatch(deleteAdminByID(id));
        break;
      case 'super-admins':
        dispatch(deleteSuperAdmins(id));
        break;
      case 'tasks':
        dispatch(deleteTasks(id));
        break;
      case 'projects':
        dispatch(deleteProject(id));
        break;
      case 'time-sheets':
        dispatch(deleteTimesheets(id));
        break;
      default:
        dispatch(setModalContent(<p>Can not delete entitie</p>));
        setTimeout(() => dispatch(setShowModal(false)), 2000);
    }
  };

  const showEmployeeList = (members) => {
    let counter = 0;

    members.forEach((team) => {
      team.employee !== null && counter++;
    });

    if (counter !== members.length) {
      dispatch(setModalContent(<p>This project does not have any active employee!</p>));
      dispatch(setShowModal(true));
      setTimeout(() => {
        dispatch(setShowModal(false));
      }, 2000);
    } else {
      dispatch(
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
                {members.map((team, index) => {
                  if (team.employee) {
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
                dispatch(setShowModal(false));
              }}
            >
              Go back
            </button>
          </>
        )
      );
      dispatch(setShowModal(true));
    }
  };
  window.addEventListener('keydown', (e) => {
    if (showModal && e.code === 'Escape') {
      dispatch(setModalContent(<></>));
      dispatch(setShowModal(!showModal));
    }
  });
  return (
    <>
      <Modal showModal={showModal}>{modalContent}</Modal>
      <div className={styles.container}>
        <h2>{entitie}</h2>
        <div className={styles.tableContainer}>
          <div className={styles.tableContainer2}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {headers.map((header, index) => {
                    return <th key={index}>{header}</th>;
                  })}
                  <th></th>
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
                        if (
                          typeof row[property] === 'string' ||
                          typeof row[property] === 'number'
                        ) {
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
                                    showEmployeeList(row[property]);
                                  }}
                                >
                                  Show List
                                </button>
                              </td>
                            </>
                          );
                        }
                        if (!row[property]) {
                          return <td key={index}>Element Not Found</td>;
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
                        <div>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/edit.svg`}
                            className={styles.editBtn}
                            onClick={() => {
                              dispatch(editItem(row));
                              history.push(`/${entitie}/form/${row._id}`);
                            }}
                          />
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`}
                            className={styles.closeBtn}
                            onClick={(e) => {
                              e.preventDefault();
                              openModal(row._id);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.imgContainer}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/add.svg`}
              onClick={() => {
                dispatch(editItem({}));
                history.push(`/${entitie}/form/0`);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
