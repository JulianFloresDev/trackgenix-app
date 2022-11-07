import styles from './time-sheets.module.css';
import { useState, useEffect } from 'react';
import Table from '../Share/Table';

function TimeSheets() {
  const [list, setList] = useState([]);
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`);
    const data = await response.json();
    setList(data.data || []);
  }, []);
  return (
    <section className={styles.container}>
      <Table headers={['description', 'date', 'task', 'project', 'employee']} data={list} />
    </section>
  );
}

export default TimeSheets;
