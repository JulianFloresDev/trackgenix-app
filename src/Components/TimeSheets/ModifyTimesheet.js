import styles from './time-sheets.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Option from './Option';

function modifyTimesheet(props) {
  const [employeesList, setEmployeesList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [tasksList, setTasksList] = useState([]);
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
      console.log(err);
    }
  }, []);

  if (props.modifyModalControl[0].date) {
    const day = props.modifyModalControl[0].date.substring(8, 10);
    const month = props.modifyModalControl[0].date.substring(5, 7);
    const year = props.modifyModalControl[0].date.substring(0, 4);
    const dateNewFormat = `${year}-${month}-${day}`;
    props.modifyModalControl[0].date = dateNewFormat;
  }
  const [data, setData] = useState({
    ...props.modifyModalControl[0]
  });

  const onchange = (e) => {
    e.preventDefault();
    const targetName = e.target.name;
    data[targetName] = e.target.value;
    setData({ ...data });
  };

  const onEdit = (e) => {
    e.preventDefault();
    props.onEdit(data);
  };

  const onAdd = (e) => {
    e.preventDefault();
    props.onAdd(data);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div>
          {props.modifyModalControl.id ? <h2>Edit Timesheet</h2> : <h2>Add Timesheet</h2>}
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/exit.svg`}
            onClick={() => props.hideModal()}
          />
        </div>
        <form>
          <div>
            <label>Date</label>
            <input type="date" name="date" value={data.date} onChange={onchange} />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={data.description}
              onChange={onchange}
              placeholder="Description..."
            />
          </div>
          <div>
            <label>Employee</label>
            <select name="employee" onChange={onchange} value={data.employee}>
              <option>Select an Employee</option>
              {employeesList.map((employee) => {
                return <Option.OptionEmployees key={employee._id} employee={employee} />;
              })}
            </select>
          </div>
          <div>
            <label>Project</label>
            <select name="project" onChange={onchange} value={data.project}>
              <option>Select a Project</option>
              {projectsList.map((project) => {
                return <Option.OptionProjects key={project._id} project={project} />;
              })}
            </select>
          </div>
          <div>
            <label>Task</label>
            <select name="task" onChange={onchange} value={data.task}>
              <option>Select a Task</option>
              {tasksList.map((task) => {
                return <Option.OptionTasks key={task._id} task={task} />;
              })}
            </select>
          </div>
          <div>
            <label>Hours</label>
            <input
              type="number"
              name="hours"
              value={data.hours}
              onChange={onchange}
              placeholder="Hours"
            />
          </div>
          {props.errorMessage && <h4>{props.errorMessage.toUpperCase()}</h4>}
          {props.modifyModalControl[1].id ? (
            <button onClick={onEdit}>Edit</button>
          ) : (
            <button onClick={onAdd}>Add</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default modifyTimesheet;
