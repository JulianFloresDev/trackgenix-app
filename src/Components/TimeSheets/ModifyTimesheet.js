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
    const targetName = e.target.name;
    data[targetName] = e.target.value;
    setData(data);
  };

  const onEdit = (e) => {
    e.preventDefault();
    props.onEdit(data);
    props.hideModal();
  };

  const onAdd = (e) => {
    e.preventDefault();
    props.onAdd(data);
    props.hideModal();
  };

  return (
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
      <button onClick={() => props.hideModal()}>Cancel</button>
      {props.modifyModalControl.id ? (
        <button onClick={onEdit}>Edit</button>
      ) : (
        <button onClick={onAdd}>Add</button>
      )}
    </form>
  );
}

export default modifyTimesheet;
