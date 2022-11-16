import styles from './table.module.css';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal';
import { useSelector, useDispatch } from 'react-redux';
import { setModalContent, setShowModal } from '../../../redux/global/actions';
import { deleteTasks } from '../../../redux/tasks/thunks';
import { deleteEmployees } from '../../../redux/employees/thunks';
import { deleteAdminByID } from '../../../redux/admins/thunks';
import { deleteTimesheets } from '../../../redux/time-sheets/thunks';
import { deleteProject } from '../../../redux/projects/thunks';

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
          Are you sure?
          <div>
            <button onClick={() => deleteItem(id)}>Yes</button>
            <button onClick={() => dispatch(setShowModal(false))}>No</button>
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
        console.log('dispatch(deleteSuperAdmins(id)');
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
        <table className={styles.table}>
          <caption>{entitie}</caption>
          <thead>
            <tr>
              {headers.map((header, index) => {
                return <td key={index}>{header}</td>;
              })}
              <td>
                <button className={styles.addBtn} onClick={() => history.push(`/${entitie}/new`)}>
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
                        history.push(`/${entitie}/form/${row._id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.closeBtn}
                      onClick={(e) => {
                        e.preventDefault();
                        openModal(row._id);
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
