import { useState, useEffect } from 'react';
import Table from '../Share/Table';
import styles from './tasks.module.css';
import Spinner from '../Share/Spinner';

function Tasks() {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
    const data = await response.json();
    setList(data.data || []);
    setTimeout(() => setIsFetching(false), 2000);
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <div className={styles.container}>
          <Spinner entitie="Tasks" />
        </div>
      ) : (
        <Table headers={['description', 'createdAt', 'updatedAt']} data={list} setList={setList} />
      )}
    </section>
  );
}

export default Tasks;
