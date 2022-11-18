import styles from './form.module.css';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editTask, getTasks } from '../../../redux/tasks/thunks';
import { editEmployee, getEmployees } from '../../../redux/employees/thunks';
import { getTimesheets, editTimesheets } from '../../../redux/time-sheets/thunks';
import { editSuperAdmin, getSuperAdmins } from '../../../redux/super-admins/thunks';
import { editProject, getProjects } from '../../../redux/projects/thunks';
import { getAdmins, editAdmin } from '../../../redux/admins/thunks';
import { editItem, setShowModal, setModalContent } from '../../../redux/global/actions';
import { InputForm } from '../InputForm';
import { SelectForm } from '../SelectForm';
import Modal from '../Modal';
import modalStyles from '../Modal/modal.module.css';
import Spinner from '../Spinner';

const Form = () => {
  const dispatch = useDispatch();
  const { showModal, modalContent, itemToPUT, isFetchingData } = useSelector(
    (state) => state.global
  );
  const { list: tasksList } = useSelector((state) => state.tasks);
  const { list: employeeList } = useSelector((state) => state.employees);
  const { list: projectList } = useSelector((state) => state.projects);
  const newTeamMember = { employee: '', role: '', rate: '' };
  delete itemToPUT['_id'];
  delete itemToPUT['__v'];
  delete itemToPUT['createdAt'];
  delete itemToPUT['updatedAt'];
  const body = {
    ...itemToPUT,
    dni: itemToPUT.dni?.toString(),
    phone: itemToPUT.phone?.toString(),
    employee: itemToPUT.employee?._id || itemToPUT.employee,
    task: itemToPUT.task?._id || itemToPUT.task,
    project: itemToPUT.project?._id || itemToPUT.project,
    teamMembers: itemToPUT.teamMembers?.map((member) => {
      return { ...member, employee: member.employee?._id || member.employee };
    })
  };
  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const id = useParams().id;
  const entitie = URLPath[1];

  useEffect(async () => {
    try {
      switch (entitie) {
        case 'employees':
          dispatch(getEmployees(id));
          break;
        case 'admins':
          dispatch(getAdmins(id));
          break;
        case 'super-admins':
          dispatch(getSuperAdmins(id));
          break;
        case 'tasks':
          dispatch(getTasks(id));
          break;
        case 'projects':
          dispatch(getProjects(id));
          break;
        case 'time-sheets':
          dispatch(getTimesheets(id));
          break;
        default:
          history.push(`/`);
          break;
      }
      dispatch(getEmployees(''));
      dispatch(getProjects(''));
      dispatch(getTasks(''));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const editRow = () => {
    switch (entitie) {
      case 'employees':
        dispatch(editEmployee(id, body));
        break;
      case 'admins':
        dispatch(editAdmin(id, body));
        break;
      case 'projects':
        dispatch(editProject(id, body));
        break;
      case 'super-admins':
        dispatch(editSuperAdmin(id, body));
        break;
      case 'tasks':
        dispatch(editTask(id, body));
        break;
      case 'time-sheets':
        dispatch(editTimesheets(id, body));
        break;
      default:
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
            <h2>Edit {entitie.slice(0, -1)}</h2>
            <form>
              {Object.keys(itemToPUT)?.map((prop, index) => {
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
                switch (prop) {
                  case 'name':
                    return <InputForm element={prop} label={'Project Name'} inputType={'text'} />;
                  case 'clientName':
                    return <InputForm element={prop} label={'Client Name'} inputType={'text'} />;
                  case 'firstName':
                    return <InputForm element={prop} label={'First Name'} inputType={'text'} />;
                  case 'lastName':
                    return <InputForm element={prop} label={'Last Name'} inputType={'text'} />;
                  case 'email':
                    return <InputForm element={prop} label={'Email'} inputType={'email'} />;
                  case 'password':
                    return <InputForm element={prop} label={'Password'} inputType={'password'} />;
                  case 'dni':
                    return <InputForm element={prop} label={'D.N.I.'} inputType={'number'} />;
                  case 'rate':
                    return <InputForm element={prop} label={'Rate'} inputType={'number'} />;
                  case 'hours':
                    return <InputForm element={prop} label={'Hours'} inputType={'number'} />;
                  case 'phone':
                    return <InputForm element={prop} label={'Phone'} inputType={'phone'} />;
                  case 'date':
                    return <InputForm element={prop} label={'Date'} inputType={'date'} />;
                  case 'startDate':
                    return <InputForm element={prop} label={'Start Date'} inputType={'date'} />;
                  case 'endDate':
                    return <InputForm element={prop} label={'End Date'} inputType={'date'} />;
                  case 'location':
                    return <InputForm element={prop} label={'Address'} inputType={'text'} />;
                  case 'description':
                    return <InputForm element={prop} label={'Description'} inputType={'text'} />;
                  case 'active':
                    return (
                      <InputForm element={prop} label={'Project State'} inputType={'checkbox'} />
                    );
                  case 'role':
                    return (
                      <SelectForm
                        element={prop}
                        label={'Role'}
                        selectOptions={[
                          { description: 'DEV' },
                          { description: 'QA' },
                          { description: 'TL' },
                          { description: 'PM' }
                        ]}
                      />
                    );
                  case 'project':
                    return (
                      <SelectForm element={prop} label={'Projects'} selectOptions={projectList} />
                    );
                  case 'task':
                    return <SelectForm element={prop} label={'Tasks'} selectOptions={tasksList} />;
                  case 'employee':
                    return (
                      <SelectForm
                        element={prop}
                        label={'Team Members'}
                        selectOptions={employeeList}
                      />
                    );
                  default:
                    return null;
                }
              })}
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    editRow();
                  }}
                >
                  Submit
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

export default Form;
