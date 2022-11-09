import styles from './super-admins.module.css';
import { useState, useEffect } from 'react';
import Table from '../Share/Table';
import Spinner from '../Share/Spinner';

function SuperAdmins() {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
    const data = await response.json();
    setList(data.data || []);
    setTimeout(() => setIsFetching(false), 2000);
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <div className={styles.container}>
          <Spinner entitie="Super-Admins" />
        </div>
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
