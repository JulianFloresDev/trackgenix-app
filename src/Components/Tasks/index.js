import { useState, useEffect } from 'react';
import Table from '../Share/Table';
import styles from './tasks.module.css';

function Tasks() {
  const [list, setList] = useState([]);
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
    const data = await response.json();
    setList(data.data || []);
  }, []);
  return (
    <section className={styles.container}>
      <Table headers={['description', 'updatedAt', 'teamMembers', 'actions']} data={list} />
    </section>
  );
}

export default Tasks;
