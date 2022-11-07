import styles from './super-admins.module.css';
import { useState, useEffect } from 'react';
import Table from '../Share/Table';

function SuperAdmins() {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
    const data = await response.json();
    setList(data.data || []);
    setIsFetching(false);
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <h2>Loading Super Admins . . .</h2>
      ) : (
        <Table
          headers={['firstName', 'lastName', 'dni', 'email', 'location', 'phone']}
          data={list}
        />
      )}
    </section>
  );
}

export default SuperAdmins;
