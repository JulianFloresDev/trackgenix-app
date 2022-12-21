import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './table.module.css';
import { Modal, AddHour, Search } from 'Components/Share';
import modalStyles from 'Components/Share/Modal/modal.module.css';
import {
  editItem,
  setModalContent,
  setShowModal,
  setFilterData,
  setSortBy
} from 'redux/global/actions';
import { deleteTasks } from 'redux/tasks/thunks';
import { deleteEmployees } from 'redux/employees/thunks';
import { deleteAdminByID } from 'redux/admins/thunks';
import { deleteTimesheets } from 'redux/time-sheets/thunks';
import { deleteProject } from 'redux/projects/thunks';
import { deleteSuperAdmins } from 'redux/super-admins/thunks';

const Table = ({
  headers,
  data,
  editable = { edit: false, remove: false, add: false },
  filteredTimesheets
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const entitie = URLPath[1];
  const { showModal, modalContent, filteredData } = useSelector((state) => state.global);
  const { role } = useSelector((state) => state.auth);
  const { user, selectedProperty } = useSelector((state) => state.global);

  useEffect(() => {
    dispatch(setFilterData(data));
  }, [data]);

  const newData = filteredData ? [...filteredData] : data ? [...data] : [];

  const openDeleteModal = (element) => {
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
            <button className={modalStyles.confirmBtn} onClick={() => deleteItem(element)}>
              Submit
            </button>
          </div>
        </>
      )
    );
  };
  const openAddHoursModal = (projectId) => {
    dispatch(setShowModal(true));
    dispatch(setModalContent(<AddHour project={projectId} />));
  };
  const workedHours = (project) => {
    let totalHours = 0;
    const projectTimeSheets = filteredTimesheets.filter((ts) => ts.project?._id === project._id);
    projectTimeSheets.forEach((ts) => {
      totalHours = totalHours + ts.hours;
    });
    return totalHours;
  };
  const deleteItem = (element) => {
    switch (entitie) {
      case 'employees':
        dispatch(deleteEmployees(element._id, element.firebaseUid));
        break;
      case 'admins':
        dispatch(deleteAdminByID(element._id, element.firebaseUid));
        break;
      case 'super-admins':
        dispatch(deleteSuperAdmins(element._id, element.firebaseUid));
        break;
      case 'tasks':
        dispatch(deleteTasks(element._id));
        break;
      case 'projects':
        dispatch(deleteProject(element._id));
        break;
      case 'time-sheets':
        dispatch(deleteTimesheets(element._id));
        break;
      default:
        dispatch(setModalContent(<p>Can not delete entitie</p>));
    }
  };

  const showEmployeeList = (project) => {
    let counter = 0;

    project.teamMembers?.forEach((team) => {
      team.employee !== null && counter++;
    });

    if (counter !== project.teamMembers?.length) {
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
                {project.employeePM?.employee ? (
                  <tr>
                    <td>{`${project.employeePM?.employee?.firstName} ${project.employeePM?.employee?.lastName}`}</td>
                    <td>{project.employeePM?.role}</td>
                    <td>{project.employeePM?.rate}</td>
                  </tr>
                ) : (
                  <tr>
                    <td>This Project have not PM!</td>
                    <td>{project.employeePM?.role}</td>
                    <td>--</td>
                  </tr>
                )}
                {project.teamMembers?.map((team, index) => {
                  if (team.role !== 'PM') {
                    return (
                      <tr key={index}>
                        <td>{`${team?.employee?.firstName} ${team.employee?.lastName}`}</td>
                        <td>{team?.role}</td>
                        <td>{team?.rate}</td>
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

  return (
    <>
      <Modal showModal={showModal}>{modalContent}</Modal>
      <div className={styles.container}>
        <div className={styles.tableHeaderContainer}>
          <h2>{entitie}</h2>
          <Search list={data} />
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableContainer2}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {entitie === 'projects' && <th></th>}
                  {headers?.map((header, index) => {
                    return (
                      <th
                        key={index}
                        className={header === selectedProperty ? styles.sortSelected : undefined}
                        onClick={() => dispatch(setSortBy(header))}
                      >
                        {header}
                      </th>
                    );
                  })}
                  {entitie === 'projects' && role === 'employee' && <th>Worked hours</th>}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {newData
                  ?.reverse()
                  ?.sort((a, b) => {
                    return a[selectedProperty] > b[selectedProperty]
                      ? 1
                      : a[selectedProperty] < b[selectedProperty]
                      ? -1
                      : 0;
                  })
                  .map((row, index) => {
                    return (
                      <tr key={index}>
                        {entitie === 'projects' && (
                          <td>
                            {row.employeePM?.employee?._id === user._id ? (
                              <span className={styles.PM}>PM</span>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        )}
                        {headers?.map((property, index) => {
                          if (typeof row[property] === 'boolean') {
                            if (row[property]) {
                              return <td key={index + 500}>Active</td>;
                            } else {
                              return <td key={index + 500}>Finish</td>;
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
                            return <td key={index + 500}>{row[property]}</td>;
                          }
                          if (Array.isArray(row[property])) {
                            return (
                              <>
                                <td key={index + 500}>
                                  <button
                                    className={styles.showListBtn}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      showEmployeeList(row);
                                    }}
                                  >
                                    Show List
                                  </button>
                                </td>
                              </>
                            );
                          }
                          if (!row[property]) {
                            return <td key={index + 500}>Element Not Found</td>;
                          }
                          return (
                            <td key={index + 500} className={styles.optionInvalid}>
                              {row[property].name
                                ? row[property].name
                                : row[property].description || row[property].type}
                              {row[property].firstName && row[property].firstName}{' '}
                              {row[property].lastName}
                            </td>
                          );
                        })}
                        {entitie === 'projects' && role === 'employee' && (
                          <td>{workedHours(row)}</td>
                        )}
                        <td className={styles.buttonsContainer}>
                          <div>
                            {entitie === 'projects' && role === 'employee' && (
                              <img
                                src={`${process.env.PUBLIC_URL}/assets/images/watch.svg`}
                                onClick={() => {
                                  openAddHoursModal(row._id);
                                }}
                              />
                            )}
                            {(editable.edit ||
                              (entitie === 'projects' &&
                                row.employeePM?.employee?._id === user?._id)) && (
                              <img
                                src={`${process.env.PUBLIC_URL}/assets/images/edit.svg`}
                                className={styles.editBtn}
                                onClick={() => {
                                  dispatch(editItem(row));
                                  history.push(`/${entitie}/form/${row._id}`);
                                }}
                              />
                            )}
                            {editable.remove && (
                              <img
                                src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`}
                                className={styles.closeBtn}
                                onClick={(e) => {
                                  e.preventDefault();
                                  dispatch(editItem(row));
                                  openDeleteModal(row);
                                }}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {editable.add && (
            <div className={styles.imgContainer}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/add.svg`}
                onClick={() => {
                  dispatch(editItem({}));
                  history.push(`/${entitie}/form/0`);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Table;
