import styles from './time-sheets.module.css';
import { useState, useEffect } from 'react';
import Table from '../Share/Table';

function TimeSheets() {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`);
    const data = await response.json();
    setList(data.data || []);
    setIsFetching(false);
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <h2>Loading Time Sheets . . .</h2>
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
