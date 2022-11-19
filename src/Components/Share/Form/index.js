import styles from './form.module.css';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSuperAdmins,
  editSuperAdmin,
  createSuperAdmin
} from '../../../redux/super-admins/thunks';
import { getAdmins, editAdmin, createAdmin } from '../../../redux/admins/thunks';
import { getEmployees, editEmployee, createEmployee } from '../../../redux/employees/thunks';
import { getProjects, editProject, createProject } from '../../../redux/projects/thunks';
import { getTimesheets, editTimesheets, createTimesheets } from '../../../redux/time-sheets/thunks';
import { getTasks, editTask, createTask } from '../../../redux/tasks/thunks';
import { editItem, setShowModal, setModalContent } from '../../../redux/global/actions';
import Modal from '../Modal';
import modalStyles from '../Modal/modal.module.css';
import Spinner from '../Spinner';
import { InputForm } from '../InputForm';
import { SelectForm } from '../SelectForm';
import TeamMembersTable from 'Components/Share/TeamMembersTable';

const CreateForm = () => {
  const dispatch = useDispatch();
  const { isFetchingData, showModal, modalContent, itemToPUT } = useSelector(
    (state) => state.global
  );
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
  const { list: tasksList } = useSelector((store) => store.tasks);
  const { list: employeeList } = useSelector((state) => state.employees);
  const { list: projectList } = useSelector((state) => state.projects);
  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const entitie = URLPath[1];
  const id = useParams().id;
  const usersStructure = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dni: '',
    phone: '',
    location: ''
  };

  useEffect(async () => {
    switch (entitie) {
      case 'admins':
        dispatch(id !== '0' ? getAdmins(id) : editItem(usersStructure));
        break;
      case 'super-admins':
        dispatch(id !== '0' ? getSuperAdmins(id) : editItem(usersStructure));
        break;
      case 'employees':
        dispatch(id !== '0' ? getEmployees(id) : editItem(usersStructure));
        break;
      case 'projects':
        dispatch(
          id !== '0'
            ? getProjects(id)
            : editItem({
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
          id !== '0'
            ? getTimesheets(id)
            : editItem({
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
        dispatch(id !== '0' ? getTasks(id) : editItem({ description: '' }));
    }
    dispatch(getEmployees(''));
    dispatch(getProjects(''));
    dispatch(getTasks(''));
  }, []);

  const modifyRow = async () => {
    switch (entitie) {
      case 'employees':
        dispatch(id === '0' ? createEmployee(itemToPUT) : editEmployee(id, body));
        break;
      case 'admins':
        dispatch(id === '0' ? createAdmin(itemToPUT) : editAdmin(id, body));
        break;
      case 'super-admins':
        dispatch(id === '0' ? createSuperAdmin(itemToPUT) : editSuperAdmin(id, body));
        break;
      case 'projects':
        dispatch(id === '0' ? createProject(itemToPUT) : editProject(id, body));
        break;
      case 'tasks':
        dispatch(id === '0' ? createTask(itemToPUT) : editTask(id, body));
        break;
      case 'time-sheets':
        dispatch(id === '0' ? createTimesheets(itemToPUT) : editTimesheets(id, body));
        break;
      default:
        history.push('/');
        break;
    }
  };

  // const editRow = () => {
  //   switch (entitie) {
  //     case 'employees':
  //       dispatch(editEmployee(id, body));
  //       break;
  //     case 'admins':
  //       dispatch(editAdmin(id, body));
  //       break;
  //     case 'projects':
  //       dispatch(editProject(id, body));
  //       break;
  //     case 'super-admins':
  //       dispatch(editSuperAdmin(id, body));
  //       break;
  //     case 'tasks':
  //       dispatch(editTask(id, body));
  //       break;
  //     case 'time-sheets':
  //       dispatch(editTimesheets(id, body));
  //       break;
  //     default:
  //       break;
  //   }
  // };

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
        <Spinner entitie={entitie} />
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
            <h2>{`${id !== '0' ? 'Edit' : 'Create'} ${entitie.slice(0, -1)}`}</h2>
            <form>
              {Object.keys(itemToPUT).map((prop /*, index*/) => {
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
                  case 'location':
                    return <InputForm element={prop} label={'Address'} inputType={'text'} />;
                  case 'description':
                    return <InputForm element={prop} label={'Description'} inputType={'text'} />;
                  case 'password':
                    return <InputForm element={prop} label={'Password'} inputType={'password'} />;
                  case 'dni':
                    return <InputForm element={prop} label={'D.N.I.'} inputType={'number'} />;
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
                  case 'active':
                    return (
                      <InputForm element={prop} label={'Project State'} inputType={'checkbox'} />
                    );
                  case 'teamMembers':
                    return (
                      <TeamMembersTable
                        element={prop}
                        label={'Team Members'}
                        itemToPUT={itemToPUT}
                        employeeList={employeeList}
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
                      <SelectForm element={prop} label={'Employees'} selectOptions={employeeList} />
                    );
                  default:
                    return null;
                }
              })}
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    {
                      modifyRow();
                    }
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

export default CreateForm;
