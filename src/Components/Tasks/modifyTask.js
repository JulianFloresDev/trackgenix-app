import styles from './tasks.module.css';
import { useState } from 'react';

function modifyTask(props) {
  const [data, setData] = useState({ description: '' });

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
          {props.modifyModalControl.id ? <h2>Edit Task</h2> : <h2>Add Task</h2>}
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/exit.svg`}
            onClick={() => props.hideModal()}
          />
        </div>
        <form>
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
          {props.errorMessage && <h4>{props.errorMessage.toUpperCase()}</h4>}
          {props.modifyModalControl.id ? (
            <button onClick={onEdit}>Edit</button>
          ) : (
            <button onClick={onAdd}>Add</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default modifyTask;
