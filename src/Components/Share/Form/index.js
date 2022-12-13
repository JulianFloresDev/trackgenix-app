import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { formSchema } from 'Validations/formSchema';
import styles from './form.module.css';
import modalStyles from 'Components/Share/Modal/modal.module.css';
import { Spinner, Modal, InputForm, SelectForm, TeamMembersTable } from 'Components/Share';
import { getSuperAdmins, editSuperAdmin, createSuperAdmin } from 'redux/super-admins/thunks';
import { getAdmins, editAdmin, createAdmin } from 'redux/admins/thunks';
import { getEmployees, editEmployee, createEmployee } from 'redux/employees/thunks';
import { getProjects, editProject, createProject } from 'redux/projects/thunks';
import { getTimesheets, editTimesheets, createTimesheets } from 'redux/time-sheets/thunks';
import { getTasks, editTask, createTask } from 'redux/tasks/thunks';
import { editItem, setShowModal } from 'redux/global/actions';

const Form = () => {
  const dispatch = useDispatch();
  const { isFetchingData, showModal, modalContent, itemToPUT, user } = useSelector(
    (state) => state.global
  );
  delete itemToPUT['_id'];
  delete itemToPUT['__v'];
  delete itemToPUT['createdAt'];
  delete itemToPUT['updatedAt'];
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

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    node: 'onChange',
    resolver: joiResolver(formSchema)
  });
  useEffect(() => {
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
      case 'home':
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
        dispatch(id !== '0' ? getTasks(id) : editItem({ type: '' }));
    }
    reset({
      ...itemToPUT,
      dni: itemToPUT.dni?.toString(),
      phone: itemToPUT.phone?.toString(),
      employee: itemToPUT.employee?._id || itemToPUT.employee,
      task: itemToPUT.task?._id || itemToPUT.task,
      project: itemToPUT.project?._id || itemToPUT.project,
      employeePM: {
        employee: itemToPUT.employeePM?.employee?._id || itemToPUT.employeePM?.employee,
        role: itemToPUT.employeePM?.role,
        rate: itemToPUT.employeePM?.rate
      },
      teamMembers: itemToPUT.teamMembers?.map((member) => {
        return { ...member, employee: member.employee?._id || member.employee };
      })
    });
    dispatch(getEmployees(''));
    dispatch(getProjects(''));
    dispatch(getTasks(''));
  }, []);

  const modifyRow = (data) => {
    const employeeProductManager = itemToPUT.teamMembers.find((employee) => employee.role === 'PM');
    const body = {
      ...data,
      dni: data.dni?.toString(),
      phone: data.phone?.toString(),
      employee: data.employee?._id || data.employee,
      task: data.task?._id || data.task,
      project: data.project?._id || data.project,
      employeePM: {
        employee: employeeProductManager?.employee?._id || employeeProductManager?.employee,
        role: employeeProductManager?.role,
        rate: employeeProductManager?.rate
      },
      teamMembers: itemToPUT.teamMembers?.map((member) => {
        return { ...member, employee: member.employee?._id || member.employee };
      }),
      firebaseUid: itemToPUT.firebaseUid
    };
    switch (entitie) {
      case 'employees':
        dispatch(id === '0' ? createEmployee(body) : editEmployee(id, body));
        break;
      case 'admins':
        dispatch(id === '0' ? createAdmin(body) : editAdmin(id, body));
        break;
      case 'super-admins':
        dispatch(id === '0' ? createSuperAdmin(body) : editSuperAdmin(id, body));
        break;
      case 'projects':
        dispatch(id === '0' ? createProject(body) : editProject(id, body));
        break;
      case 'tasks':
        dispatch(id === '0' ? createTask(body) : editTask(id, body));
        break;
      case 'time-sheets':
        dispatch(
          id === '0'
            ? createTimesheets(user._id ? { ...body, employee: user._id } : body)
            : editTimesheets(id, body)
        );
        break;
      default:
        history.push('/');
        break;
    }
    !id && reset();
  };

  const goBack = () => {
    dispatch(setShowModal(false));
    history.push(`/${entitie}`);
  };

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
              {Object.keys(itemToPUT || user).map((prop, index) => {
                switch (prop) {
                  case 'name':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'Project Name'}
                        inputType={'text'}
                        register={register}
                        error={errors.name?.message}
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
                        error={errors.clientName?.message}
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
                        error={errors.firstName?.message}
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
                        error={errors.lastName?.message}
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
                        error={errors.email?.message}
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
                        error={errors.location?.message}
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
                        error={errors.description?.message}
                      />
                    );
                  case 'type':
                    return (
                      <InputForm
                        key={index}
                        element={prop}
                        label={'Task Type'}
                        inputType={'text'}
                        register={register}
                        error={errors.type?.message}
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
                        error={errors.password?.message}
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
                        error={errors.dni?.message}
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
                        error={errors.hours?.message}
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
                        error={errors.phone?.message}
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
                        error={errors.date?.message}
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
                        error={errors.startDate?.message}
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
                        error={errors.endDate?.message}
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
                        error={errors.active?.message}
                      />
                    );
                  case 'teamMembers':
                    return (
                      <>
                        <TeamMembersTable
                          key={index}
                          element={prop}
                          label={'Team Members'}
                          itemToPUT={itemToPUT}
                          employeeList={employeeList}
                        />
                        {errors.employeePM && <p>{errors.employeePM?.message}</p>}
                      </>
                    );
                  case 'project':
                    return (
                      <SelectForm
                        key={index}
                        element={prop}
                        label={'Projects'}
                        selectOptions={projectList}
                        register={register}
                        error={errors.project?.message}
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
                        error={errors.task?.message}
                      />
                    );
                  case 'employee':
                    if (user._id) {
                      return null;
                    } else {
                      return (
                        <SelectForm
                          key={index}
                          element={prop}
                          label={'Employees'}
                          selectOptions={employeeList}
                          register={register}
                          error={errors.employee?.message}
                        />
                      );
                    }
                  default:
                    return null;
                }
              })}
              <div>
                <button type="submit">Submit</button>
                <button type="button" onClick={() => reset()}>
                  Reset Form
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(editItem(id));
                    history.goBack();
                  }}
                >
                  Back
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
