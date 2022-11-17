import styles from './form.module.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSuperAdmin } from '../../../redux/super-admins/thunks';
import { createAdmin } from '../../../redux/admins/thunks';
import { createEmployee, getEmployees } from '../../../redux/employees/thunks';
import { createProject, getProjects } from '../../../redux/projects/thunks';
import { createTimesheets } from '../../../redux/time-sheets/thunks';
import { createTask, getTasks } from '../../../redux/tasks/thunks';
import { editItem, setShowModal, setModalContent } from '../../../redux/global/actions';
import Modal from '../Modal';
import modalStyles from '../Modal/modal.module.css';
import Spinner from '../Spinner';

const CreateForm = () => {
  const dispatch = useDispatch();
  const { isFetchingData, showModal, modalContent, itemToPUT } = useSelector(
    (state) => state.global
  );
  const { list: taskList } = useSelector((store) => store.tasks);
  const { list: employeeList } = useSelector((state) => state.employees);
  const { list: projectList } = useSelector((state) => state.projects);
  const newTeamMember = { employee: '', role: '', rate: '' };
  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const entitie = URLPath[1];

  useEffect(async () => {
    dispatch(getEmployees(''));
    switch (entitie) {
      case 'admins':
      case 'super-admins':
      case 'employees':
        dispatch(
          editItem({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            dni: '',
            phone: '',
            location: ''
          })
        );
        break;
      case 'projects':
        dispatch(
          editItem({
            name: '',
            description: '',
            startDate: '',
            endDate: '',
            active: '',
            clientName: '',
            teamMembers: [{ employee: '', role: '', rate: '' }]
          })
        );
        break;
      case 'time-sheets':
        dispatch(
          editItem({
            description: '',
            date: '',
            task: '',
            project: '',
            employee: '',
            hours: ''
          })
        );
        break;
      case 'tasks':
        dispatch(editItem({ description: '' }));
    }
  }, []);

  useEffect(async () => {
    try {
      dispatch(getEmployees(''));
      dispatch(getProjects(''));
      dispatch(getTasks(''));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const createRow = async () => {
    switch (entitie) {
      case 'employees':
        dispatch(createEmployee(itemToPUT));
        break;
      case 'admins':
        dispatch(createAdmin(itemToPUT));
        break;
      case 'super-admins':
        dispatch(createSuperAdmin(itemToPUT));
        break;
      case 'projects':
        dispatch(createProject(itemToPUT));
        break;
      case 'tasks':
        dispatch(createTask(itemToPUT));
        break;
      case 'time-sheets':
        dispatch(createTimesheets(itemToPUT));
        break;
      default:
        history.push('/');
        break;
    }
  };

  const goBack = () => {
    dispatch(setShowModal(false));
    history.push(`/${entitie}`);
  };

  window.addEventListener('keydown', (e) => {
    if (showModal && e.code === 'Escape') {
      dispatch(setModalContent(<></>));
      dispatch(setShowModal(!showModal));
    }
  });

  return (
    <>
      {isFetchingData ? (
        <Spinner entitie="Admins" />
      ) : (
        <>
          <Modal showModal={showModal}>
            {modalContent}
            <div className={modalStyles.buttonsContainer}>
              <button
                className={modalStyles.cancelBtn}
                onClick={() => dispatch(setShowModal(false))}
              >
                Close
              </button>
              <button className={modalStyles.confirmBtn} onClick={() => goBack()}>
                Back to {entitie.slice(0, -1).toUpperCase()}
              </button>
            </div>
          </Modal>
          <section className={styles.formSection}>
            <h2>Create {entitie.slice(0, -1)}</h2>
            <form>
              {Object.keys(itemToPUT).map((prop, index) => {
                if (prop === 'employee') {
                  return (
                    <div key={index}>
                      <label htmlFor={prop}>{prop}</label>
                      <select
                        name={prop}
                        onChange={(e) => {
                          itemToPUT[prop] = e.target.value;
                          dispatch(editItem({ ...itemToPUT }));
                        }}
                        value={itemToPUT[prop]?._id}
                      >
                        <option hidden>Select an Employee</option>
                        {employeeList.map((employee) => {
                          return (
                            <option
                              value={employee?._id}
                              key={employee?._id}
                            >{`${employee?.firstName} ${employee?.lastName}`}</option>
                          );
                        })}
                      </select>
                    </div>
                  );
                }
                if (prop === 'project') {
                  return (
                    <div key={index}>
                      <label htmlFor={prop}>{prop}</label>
                      <select
                        name={prop}
                        onChange={(e) => {
                          itemToPUT[prop] = e.target.value;
                          dispatch(editItem({ ...itemToPUT }));
                        }}
                        value={itemToPUT[prop]?._id}
                      >
                        <option hidden>Select a Project</option>
                        {projectList.map((project) => {
                          return (
                            <option value={project?._id} key={project?._id}>
                              {project?.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  );
                }
                if (prop === 'task') {
                  return (
                    <div key={index}>
                      <label htmlFor={prop}>{prop}</label>
                      <select
                        name={prop}
                        onChange={(e) => {
                          itemToPUT[prop] = e.target.value;
                          dispatch(editItem({ ...itemToPUT }));
                        }}
                        value={itemToPUT[prop]?._id}
                      >
                        <option hidden>Select a Task</option>
                        {taskList.map((task) => {
                          return (
                            <option value={task?._id} key={task?._id}>
                              {task?.description}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  );
                }
                if (prop === 'teamMembers') {
                  return (
                    <div key={index} className={styles.teamMembers}>
                      <label htmlFor={prop}>{prop}</label>
                      <table>
                        <thead>
                          <tr>
                            {Object.keys(itemToPUT[prop][0]).map((key, index) => {
                              return <th key={index}>{key}</th>;
                            })}
                            <th>
                              <img
                                src={`${process.env.PUBLIC_URL}/assets/images/addMember.svg`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  itemToPUT.teamMembers.unshift(newTeamMember);
                                  dispatch(editItem({ ...itemToPUT }));
                                }}
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {itemToPUT[prop].map((item, index) => {
                            return (
                              <tr key={index}>
                                {Object.keys(item).map((info) => {
                                  if (info === 'role') {
                                    return (
                                      <td key={index}>
                                        <select
                                          value={item.employee ? item[info] : '-'}
                                          onChange={(e) => {
                                            item[info] = e.target.value;
                                            dispatch(editItem({ ...itemToPUT }));
                                          }}
                                        >
                                          <option hidden>-</option>
                                          <option>DEV</option>
                                          <option>QA</option>
                                          <option>PM</option>
                                          <option>TL</option>
                                        </select>
                                      </td>
                                    );
                                  }
                                  if (info === 'rate') {
                                    return (
                                      <td key={index}>
                                        <input
                                          type="number"
                                          value={item.employee ? item[info] : 0}
                                          onChange={(e) => {
                                            item[info] = e.target.value;
                                            dispatch(editItem({ ...itemToPUT }));
                                          }}
                                        />
                                      </td>
                                    );
                                  }
                                  if (info === 'employee') {
                                    return (
                                      <td key={index}>
                                        <select
                                          value={item[info] ? item[info]._id : 0}
                                          onChange={(e) => {
                                            item[info] = e.target.value;
                                            dispatch(editItem({ ...itemToPUT }));
                                          }}
                                        >
                                          {employeeList?.map((employee) => {
                                            return (
                                              <option key={employee._id} value={employee?._id}>
                                                {employee.firstName} {employee.lastName}
                                              </option>
                                            );
                                          })}
                                          <option value={0} hidden>
                                            Select an Employee
                                          </option>
                                        </select>
                                      </td>
                                    );
                                  }
                                })}
                                <td>
                                  {itemToPUT[prop].length > 1 && (
                                    <img
                                      src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        itemToPUT[prop].splice(index, 1);
                                        dispatch(editItem({ ...itemToPUT }));
                                      }}
                                    />
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                let inputType = 'text';
                if (prop.match('date') || prop.match('endDate') || prop.match('startDate')) {
                  inputType = 'date';
                  itemToPUT[prop] = itemToPUT[prop].substring(0, 10);
                }
                prop.includes('hours') && (inputType = 'number');
                prop.includes('active') && (inputType = 'checkbox');
                prop.includes('password') && (inputType = 'password');
                return (
                  <div key={index}>
                    <label htmlFor={prop}>{prop}</label>
                    <input
                      id={prop}
                      type={inputType}
                      value={itemToPUT[prop]}
                      onChange={(e) => {
                        e.target.type === 'checkbox'
                          ? (itemToPUT[prop] = e.target.checked)
                          : (itemToPUT[prop] = e.target.value);
                        dispatch(editItem({ ...itemToPUT }));
                      }}
                    />
                  </div>
                );
              })}
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    createRow();
                  }}
                >
                  Create
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/${entitie}`);
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  );
};

export default CreateForm;
