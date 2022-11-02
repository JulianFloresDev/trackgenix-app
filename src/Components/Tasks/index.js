import { useState } from 'react';
import { useEffect } from 'react';
import styles from './tasks.module.css';
import Table from './Table';
import ModifyTask from './modifyTask';
import SuccessModal from './SuccessModal';

const Tasks = () => {
  const [tasksList, setTasksList] = useState([]);
  const [modifyModalControl, setModifyModalControl] = useState({ id: '', modal: false });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      setTasksList(data.data);
    } catch (err) {
      console.log(err);
    }
  }, [modifyModalControl]);

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      setSuccessMessage('Task deleted successufully');
      setTimeout(() => setSuccessMessage(''), 2000);
      setTasksList([...tasksList.filter((item) => item._id !== id)]);
    } catch (error) {
      console.log(error);
    }
  };

  // Show edit modal
  const showModifyModal = (id) => {
    setModifyModalControl({ id: id, modal: true });
  };

  // Hide edit modal
  const hideModifyModal = () => {
    setModifyModalControl({ id: '', modal: false });
    setErrorMessage('');
  };

  // Edit task
  const editTask = async (data) => {
    try {
      const req = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${modifyModalControl.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const res = await req.json();
      if (res.error) {
        setErrorMessage(
          res.message[0].message || res.message || 'An unexpected error has occurred'
        );
        return;
      }
      setSuccessMessage('Task edited successfully' || res.message);
      setTimeout(() => setSuccessMessage(''), 2000);
      hideModifyModal();
    } catch (error) {
      console.log(error);
    }
  };

  //Add task
  const addTask = async (data) => {
    console.log(JSON.stringify(data));
    try {
      const req = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const res = await req.json();
      if (res.error) {
        setErrorMessage(
          res.message[0].message || res.message || 'An unexpected error has occurred'
        );
        return;
      }
      setSuccessMessage('Task added successfully' || res.message);
      setTimeout(() => setSuccessMessage(''), 2000);
      hideModifyModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <Table tasksList={tasksList} onDelete={deleteTask} showModifyModal={showModifyModal} />
      {modifyModalControl.modal && (
        <ModifyTask
          modifyModalControl={modifyModalControl}
          onEdit={editTask}
          onAdd={addTask}
          hideModal={hideModifyModal}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </section>
  );
};

export default Tasks;
