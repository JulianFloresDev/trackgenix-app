import styles from './time-sheets.module.css';
import { useState, useEffect } from 'react';
import Table from '../Share/Table';
import Spinner from '../Share/Spinner';

function TimeSheets() {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`);
    const data = await response.json();
    setList(data.data || []);
    setTimeout(() => setIsFetching(false), 2000);
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <div className={styles.container}>
          <Spinner entitie="Time Sheets" />
        </div>
      ) : (
        <Table
          headers={['description', 'date', 'task', 'project', 'employee', 'hours']}
          data={list}
        />
      )}
    </section>
  );
}

export default TimeSheets;
