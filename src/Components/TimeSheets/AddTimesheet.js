import { useState } from 'react';

function Addtimesheet(props) {
  const [editData, setEditData] = useState({
    date: '',
    description: '',
    employee: '',
    project: '',
    task: '',
    hours: ''
  });

  const onchange = (e) => {
    const targetName = e.target.name;
    editData[targetName] = e.target.value;
    setEditData(editData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.onAdd(editData);
    props.hideModal();
  };

  return (
    <form>
      <div>
        <label>Date</label>
        <input type="date" name="date" value={editData.date} onChange={onchange} />
      </div>
      <div>
        <label>Description</label>
        <input type="text" name="description" value={editData.description} onChange={onchange} />
      </div>
      <div>
        <label>Employee</label>
        <input type="text" name="employee" value={editData.employee} onChange={onchange} />
      </div>
      <div>
        <label>Project</label>
        <input type="text" name="project" value={editData.project} onChange={onchange} />
      </div>
      <div>
        <label>Task</label>
        <input type="text" name="task" value={editData.task} onChange={onchange} />
      </div>
      <div>
        <label>Hours</label>
        <input type="number" name="hours" value={editData.hour} onChange={onchange} />
      </div>
      <button onClick={() => props.hideModal()}>Cancel</button>
      <button onClick={onSubmit}>Add</button>
    </form>
  );
}

export default Addtimesheet;
