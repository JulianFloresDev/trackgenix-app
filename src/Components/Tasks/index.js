import { useState, useEffect } from 'react';
import Table from '../Share/Table';
import styles from './tasks.module.css';

function Tasks() {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
    const data = await response.json();
    setList(data.data || []);
    setIsFetching(false);
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <h2>Loading Task List . . .</h2>
      ) : (
        <Table headers={['description', 'createdAt', 'updatedAt']} data={list} setList={setList} />
      )}
    </section>
  );
}

export default Tasks;
