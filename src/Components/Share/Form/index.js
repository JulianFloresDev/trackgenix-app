import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import Modal from '../Modal';

const Form = () => {
  const [data, setData] = useState({});
  delete data['_id'];
  delete data['__v'];
  delete data['createdAt'];
  delete data['updatedAt'];

  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const id = useParams().id;
  const entitie = URLPath[1];
  const properties = Object.keys(data);

  // useEffect(async () => {
  //   if (id !== '0') {
  //     const request = id && (await fetch(`${process.env.REACT_APP_API_URL}/${entitie}/${id}`));
  //     const response = await request.json();
  //     setData(response.data || {});
  //   }
  // }, []);
  const [employeeList, setEmployeesList] = useState([]);
  const [projectList, setProjectsList] = useState([]);
  const [taskList, setTasksList] = useState([]);
  useEffect(async () => {
    try {
      if (id !== '0') {
        const request = id && (await fetch(`${process.env.REACT_APP_API_URL}/${entitie}/${id}`));
        const response = await request.json();
        setData(response.data || {});
      }
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

  // const [errorMessage, setErrorMessage] = useState('');

  const editRow = async (newData) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/${entitie}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/Json'
        },
        body: JSON.stringify(newData)
      });
      // if (res.error) {
      //   setErrorMessage(
      //     res.message[0].message || res.message || 'An unexpected error has occurred'
      //   );
      //   console.log(errorMessage);
      //   return;
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      {/* <Modal></Modal> */}
      <form>
        {properties.map((prop, index) => {
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
                  value={data[prop]._id}
                >
                  {employeeList.map((employee) => {
                    return (
                      <option
                        value={employee._id}
                        key={employee._id}
                      >{`${employee.firstName} ${employee.lastName}`}</option>
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
                  value={data[prop]._id}
                >
                  {projectList.map((project) => {
                    return (
                      <option value={project._id} key={project._id}>
                        {project.name}
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
                  value={data[prop]._id}
                >
                  {taskList.map((task) => {
                    return (
                      <option value={task._id} key={task._id}>
                        {task.description}
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
                <select
                  name={prop}
                  onChange={(e) => {
                    data[prop] = e.target.value;
                    setData({ ...data });
                  }}
                  value={data[prop]._id}
                >
                  {employeeList.map((employee) => {
                    return (
                      <option
                        value={employee._id}
                        key={employee._id}
                      >{`${employee.firstName} ${employee.lastName}`}</option>
                    );
                  })}
                </select>
                <label htmlFor={prop}>Role</label>
                <select id={prop}>
                  <option value="DEV">DEV</option>
                  <option value="QA">QA</option>
                  <option value="TL">TL</option>
                  <option value="PM">PM</option>
                </select>
                <label htmlFor={prop}>Rate</label>
                <input type="number" min="0" max="500"></input>
              </div>
            );
          }
          let inputType = 'text';
          if (prop.includes('ate')) {
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
                  console.log(data);
                }}
              />
            </div>
          );
        })}
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              editRow(data);
              history.goBack();
            }}
          >
            Submit
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
  );
};

export default Form;
