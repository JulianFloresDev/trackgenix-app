import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal';

const CreateForm = () => {
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const newTeamMember = { employee: '', role: '', rate: '' };

  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const entitie = URLPath[1];

  useEffect(async () => {
    switch (entitie) {
      case 'admins':
      case 'super-admins':
      case 'employees':
        setData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          dni: '',
          phone: '',
          location: ''
        });
        break;
      case 'projects':
        setData({
          name: '',
          description: '',
          startDate: '',
          endDate: '',
          active: '',
          clientName: '',
          teamMembers: [{ employee: '', role: '', rate: '' }]
        });
        break;
      case 'time-sheets':
        setData({
          description: '',
          date: '',
          task: '',
          project: '',
          employee: '',
          hours: ''
        });
        break;
      case 'tasks':
        setData({ description: '' });
    }
  }, []);

  const [employeeList, setEmployeesList] = useState([]);
  const [projectList, setProjectsList] = useState([]);
  const [taskList, setTasksList] = useState([]);
  useEffect(async () => {
    try {
      const resEmployees = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const dataEmployees = await resEmployees.json();
      setEmployeesList(dataEmployees.data);
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

  const createRow = async () => {
    try {
      const req = await fetch(`${process.env.REACT_APP_API_URL}/${entitie}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/Json'
        },
        body: JSON.stringify(data)
      });
      const res = await req.json();
      console.log(res);
      if (res.error) {
        setModalContent(
          res.message[0].message || res.message || 'An unexpected error has occurred'
        );
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000);
        return;
      }
      setModalContent('Added successfully' || res.message);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        history.goBack();
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
          {Object.keys(data).map((prop, index) => {
            if (prop === 'employee') {
              return (
                <div key={index}>
                  <label htmlFor={prop}>{prop}</label>
                  <select
                    name={prop}
                    onChange={(e) => {
                      data[prop] = e.target.value;
                      setData({ ...data });
                    }}
                    value={data[prop]?._id}
                  >
                    <option>Select an Employee</option>
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
                      data[prop] = e.target.value;
                      setData({ ...data });
                    }}
                    value={data[prop]?._id}
                  >
                    <option>Select a Project</option>
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
                      data[prop] = e.target.value;
                      setData({ ...data });
                    }}
                    value={data[prop]?._id}
                  >
                    <option>Select a Task</option>
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
                <div key={index}>
                  <label htmlFor={prop}>{prop}</label>
                  <table>
                    <thead>
                      <th>
                        {Object.keys(data[prop][0]).map((key, index) => {
                          return <td key={index}>{key}</td>;
                        })}
                      </th>
                    </thead>
                    <tbody>
                      {data[prop].map((item, index) => {
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
                                        setData({ ...data });
                                      }}
                                    >
                                      <option>-</option>
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
                                        setData({ ...data });
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
                                      setData({ ...data });
                                    }}
                                  >
                                    {employeeList?.map((employee) => {
                                      return (
                                        <option key={employee._id} value={employee?._id}>
                                          {employee.firstName} {employee.lastName}
                                        </option>
                                      );
                                    })}
                                    <option value={0}>Select an Employee</option>
                                  </select>
                                );
                              }
                            })}
                            <td>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                Remove Employee
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          data.teamMembers.unshift(newTeamMember);
                          setData({ ...data });
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
              data[prop] = data[prop].substring(0, 10);
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
                  value={data[prop]}
                  onChange={(e) => {
                    e.target.type === 'checkbox'
                      ? (data[prop] = e.target.checked)
                      : (data[prop] = e.target.value);
                    setData({ ...data });
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
                history.goBack();
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

export default CreateForm;
