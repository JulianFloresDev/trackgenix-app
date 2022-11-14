import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Modal from '../Modal';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../../../redux/employees/thunks';
import { setShowModal, setModalContent, editItem } from '../../../redux/global/actions';

const Form = () => {
  const dispatch = useDispatch();
  const { showModal, modalContent, itemToPUT } = useSelector((state) => state.global);
  const { list: employeeList } = useSelector((state) => state.employees);
  // const [showModal, setShowModal] = useState(false);
  // const [modalContent, setModalContent] = useState(<></>);
  const newTeamMember = { employee: '', role: '', rate: '' };
  delete itemToPUT['_id'];
  delete itemToPUT['__v'];
  delete itemToPUT['createdAt'];
  delete itemToPUT['updatedAt'];
  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const id = useParams().id;
  const entitie = URLPath[1];

  // const [employeeList, setEmployeesList] = useState([]);
  const [projectList, setProjectsList] = useState([]);
  const [taskList, setTasksList] = useState([]);

  useEffect(async () => {
    try {
      switch (entitie) {
        case 'employees':
          dispatch(getEmployees(id));
          break;
        case 'admins':
          console.log('dispatch(getAdmins(id)');
          break;
        case 'super-admins':
          console.log('dispatch(getSuperAdmins(id)');
          break;
        case 'tasks':
          console.log('dispatch(getTasks(id)');
          break;
        case 'projects':
          console.log('dispatch(getProjects(id)');
          break;
        case 'time-sheets':
          console.log('dispatch(getTimesheets(id)');
          break;
        default:
          history.push(`/`);
          break;
      }

      dispatch(getEmployees(''));
      // const resEmployees = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      // const dataEmployees = await resEmployees.json();
      // setEmployeesList(dataEmployees.data);

      const resProjects = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const dataProjects = await resProjects.json();
      setProjectsList(dataProjects.data);
      const resTasks = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const dataTasks = await resTasks.json();
      setTasksList(dataTasks.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const editRow = async () => {
    itemToPUT.teamMembers &&
      (itemToPUT.teamMembers = itemToPUT.teamMembers?.map((member) => {
        return { ...member, employee: member.employee._id || member.employee };
      }));
    dispatch(editItem({ ...itemToPUT }));

    try {
      const req = await fetch(`${process.env.REACT_APP_API_URL}/${entitie}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/Json'
        },
        body: JSON.stringify({
          ...itemToPUT,
          dni: itemToPUT.dni?.toString(),
          phone: itemToPUT.phone?.toString(),
          employee: itemToPUT.employee?._id || itemToPUT.employee,
          task: itemToPUT.task?._id || itemToPUT.task,
          project: itemToPUT.project?._id || itemToPUT.project
        })
      });
      const res = await req.json();
      if (res.error) {
        dispatch(
          setModalContent(
            (Array.isArray(res.message) && (
              <div>
                <ul>
                  {res.message.map((info, index) => {
                    return <li key={index}>{info.message}</li>;
                  })}
                </ul>
              </div>
            )) ||
              res.message ||
              'An unexpected error has occurred'
          )
        );
        dispatch(setShowModal(true));
        setTimeout(() => dispatch(setShowModal(false)), 2000);
        return;
      }
      dispatch(setModalContent('Edited successfully'));
      dispatch(setShowModal(true));
      setTimeout(() => {
        dispatch(setShowModal(false));
        history.push(`/${entitie}`);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Modal showModal={showModal}>{modalContent}</Modal>
      <section>
        <form>
          {Object.keys(itemToPUT)?.map((prop, index) => {
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
                    value={itemToPUT[prop] ? itemToPUT[prop]._id : 0}
                  >
                    {employeeList.map((employee) => {
                      return (
                        <option
                          value={employee?._id}
                          key={employee?._id}
                        >{`${employee?.firstName} ${employee?.lastName}`}</option>
                      );
                    })}
                    <option value={0} hidden>
                      Select Employee
                    </option>
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
                    value={itemToPUT[prop] ? itemToPUT[prop]._id : 0}
                  >
                    {projectList.map((project) => {
                      return (
                        <option value={project?._id} key={project?._id}>
                          {project?.name}
                        </option>
                      );
                    })}
                    <option value={0} hidden>
                      Select Project
                    </option>
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
                    value={itemToPUT[prop] ? itemToPUT[prop]._id : 0}
                  >
                    {taskList.map((task) => {
                      return (
                        <option value={task?._id} key={task?._id}>
                          {task?.description}
                        </option>
                      );
                    })}
                    <option value={0} hidden>
                      Select Task
                    </option>
                  </select>
                </div>
              );
            }
            if (prop === 'teamMembers') {
              return (
                <div key={index}>
                  <label htmlFor={prop}>{prop}</label>
                  <table>
                    <thead>
                      <th>
                        {itemToPUT[prop][0] &&
                          Object.keys(itemToPUT[prop][0])?.map((key, index) => {
                            return <td key={index}>{key}</td>;
                          })}
                      </th>
                    </thead>
                    <tbody>
                      {itemToPUT[prop]?.map((item, index) => {
                        return (
                          <tr key={index}>
                            {Object.keys(item)?.map((info) => {
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
                                      min={0}
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
                                  <select
                                    key={index}
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
                                      Select Employee
                                    </option>
                                  </select>
                                );
                              }
                            })}
                            <td>
                              {itemToPUT[prop].length > 1 && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    itemToPUT[prop].splice(index, 1);
                                    dispatch(editItem({ ...itemToPUT }));
                                  }}
                                >
                                  Remove Employee
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          itemToPUT.teamMembers = [newTeamMember, ...itemToPUT.teamMembers];
                          dispatch(editItem({ ...itemToPUT }));
                        }}
                      >
                        +
                      </button>
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
                  checked={itemToPUT[prop]}
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
  );
};

export default Form;
