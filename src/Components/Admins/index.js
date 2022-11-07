import { useState, useEffect } from 'react';
import Table from '../Share/Table';
import styles from './admins.module.css';

function Admins() {
  const [list, setList] = useState([]);
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
    const data = await response.json();
    setList(data.data || []);
  }, []);
  return (
    <section className={styles.container}>
      <Table headers={['firstName', 'lastName', 'dni', 'email', 'location', 'phone']} data={list} />
    </section>
  );
}

export default Admins;
