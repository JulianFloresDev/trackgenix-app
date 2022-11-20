import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import styles from './form.module.css';
import TeamMembersTable from 'Components/Share/TeamMembersTable';
import Spinner from 'Components/Share/Spinner';
import Modal from 'Components/Share/Modal';
import modalStyles from 'Components/Share/Modal/modal.module.css';
import { getSuperAdmins, editSuperAdmin, createSuperAdmin } from 'redux/super-admins/thunks';
import { getAdmins, editAdmin, createAdmin } from 'redux/admins/thunks';
import { getEmployees, editEmployee, createEmployee } from 'redux/employees/thunks';
import { getProjects, editProject, createProject } from 'redux/projects/thunks';
import { getTimesheets, editTimesheets, createTimesheets } from 'redux/time-sheets/thunks';
import { getTasks, editTask, createTask } from 'redux/tasks/thunks';
import { editItem, setShowModal, setModalContent } from 'redux/global/actions';
import { InputForm } from 'Components/Share/InputForm';
import { SelectForm } from 'Components/Share/SelectForm';

const CreateForm = () => {
  const dispatch = useDispatch();
  const { isFetchingData, showModal, modalContent, itemToPUT } = useSelector(
    (state) => state.global
  );
  delete itemToPUT['_id'];
  delete itemToPUT['__v'];
  delete itemToPUT['createdAt'];
  delete itemToPUT['updatedAt'];
  const defeaultValue = {
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
  console.log(defeaultValue);
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
                date: '',
                description: '',
                employee: '',
                project: '',
                task: '',
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

  const { handleSubmit, register } = useForm({ defaultValues: defeaultValue, node: 'onChange' });

  const modifyRow = async (data) => {
    const body = {
      ...data,
      dni: data.dni?.toString(),
      phone: data.phone?.toString(),
      employee: data.employee?._id || data.employee,
      task: data.task?._id || data.task,
      project: data.project?._id || data.project,
      teamMembers: itemToPUT.teamMembers?.map((member) => {
        return { ...member, employee: member.employee?._id || member.employee };
      })
    };
    switch (entitie) {
      case 'employees':
        dispatch(id === '0' ? createEmployee(data) : editEmployee(id, body));
        break;
      case 'admins':
        dispatch(id === '0' ? createAdmin(data) : editAdmin(id, body));
        break;
      case 'super-admins':
        dispatch(id === '0' ? createSuperAdmin(data) : editSuperAdmin(id, body));
        break;
      case 'projects':
        dispatch(id === '0' ? createProject(data) : editProject(id, body));
        break;
      case 'tasks':
        dispatch(id === '0' ? createTask(data) : editTask(id, body));
        break;
      case 'time-sheets':
        dispatch(id === '0' ? createTimesheets(data) : editTimesheets(id, body));
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
            <form onSubmit={handleSubmit(modifyRow)}>
              {Object.keys(itemToPUT).map((prop, index) => {
                switch (prop) {
                  case 'name':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'Project Name'}
                        inputType={'text'}
                        register={register}
                      />
                    );
                  case 'clientName':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'Client Name'}
                        inputType={'text'}
                        register={register}
                      />
                    );
                  case 'firstName':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'First Name'}
                        inputType={'text'}
                        register={register}
                      />
                    );
                  case 'lastName':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'Last Name'}
                        inputType={'text'}
                        register={register}
                      />
                    );
                  case 'email':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'Email'}
                        inputType={'email'}
                        register={register}
                      />
                    );
                  case 'location':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'Address'}
                        inputType={'text'}
                        register={register}
                      />
                    );
                  case 'description':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'Description'}
                        inputType={'text'}
                        register={register}
                      />
                    );
                  case 'password':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'Password'}
                        inputType={'password'}
                        register={register}
                      />
                    );
                  case 'dni':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'D.N.I.'}
                        inputType={'number'}
                        register={register}
                      />
                    );
                  case 'hours':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'Hours'}
                        inputType={'number'}
                        register={register}
                      />
                    );
                  case 'phone':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'Phone'}
                        inputType={'phone'}
                        register={register}
                      />
                    );
                  case 'date':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'Date'}
                        inputType={'date'}
                        register={register}
                      />
                    );
                  case 'startDate':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'Start Date'}
                        inputType={'date'}
                        register={register}
                      />
                    );
                  case 'endDate':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'End Date'}
                        inputType={'date'}
                        register={register}
                      />
                    );
                  case 'active':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'Project State'}
                        inputType={'checkbox'}
                        register={register}
                      />
                    );
                  case 'teamMembers':
                    return (
                      <TeamMembersTable
                        key={index}
                        element={prop}
                        label={'Team Members'}
                        itemToPUT={itemToPUT}
                        employeeList={employeeList}
                      />
                    );
                  case 'project':
                    return (
                      <SelectForm
                        key={index}
                        element={prop}
                        label={'Projects'}
                        selectOptions={projectList}
                        register={register}
                      />
                    );
                  case 'task':
                    return (
                      <SelectForm
                        key={index}
                        element={prop}
                        label={'Tasks'}
                        selectOptions={tasksList}
                        register={register}
                      />
                    );
                  case 'employee':
                    return (
                      <SelectForm
                        key={index}
                        element={prop}
                        label={'Employees'}
                        selectOptions={employeeList}
                        register={register}
                      />
                    );
                  default:
                    return null;
                }
              })}
              <div>
                <button type="submit">Submit</button>
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
