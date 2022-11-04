import { useState, useEffect } from 'react';
import Table from '../Share/Table';
import styles from './tasks.module.css';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
    const data = await response.json();
    setTasks(data);
  }, []);
  return (
    <section className={styles.container}>
      <Table headers={['description']} data={tasks} />
    </section>
  );
}

export default Tasks;
