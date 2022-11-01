import styles from './time-sheets.module.css';
import { useState } from 'react';

function modifyTimesheet(props) {
  const [data, setData] = useState({
    date: '',
    description: '',
    employee: '',
    project: '',
    task: '',
    hours: ''
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
            <input type="text" name="description" value={data.description} onChange={onchange} />
          </div>
          <div>
            <label>Employee</label>
            <input type="text" name="employee" value={data.employee} onChange={onchange} />
          </div>
          <div>
            <label>Project</label>
            <input type="text" name="project" value={data.project} onChange={onchange} />
          </div>
          <div>
            <label>Task</label>
            <input type="text" name="task" value={data.task} onChange={onchange} />
          </div>
          <div>
            <label>Hours</label>
            <input type="number" name="hours" value={data.hour} onChange={onchange} />
          </div>
          {props.errorMessage && <h4>{props.errorMessage.toUpperCase()}</h4>}
          {props.modifyModalControl.id ? (
            <button onClick={onEdit} className={styles.btnSend}>
              Edit
            </button>
          ) : (
            <button onClick={onAdd}>Add</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default modifyTimesheet;
