import styles from './employees.module.css';
import { useState, useEffect } from 'react';
import Table from '../Share/Table';

function Employees() {
  const [list, setList] = useState([]);
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
    const data = await response.json();
    setList(data.data || []);
  }, []);
  return (
    <section className={styles.container}>
      <Table headers={['firstName', 'lastName', 'dni', 'email', 'location', 'phone']} data={list} />
    </section>
  );
}

export default Employees;
