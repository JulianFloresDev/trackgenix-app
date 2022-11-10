import { useState, useEffect } from 'react';
import Table from '../Share/Table';
import styles from './admins.module.css';
import Spinner from '../Share/Spinner';

function Admins() {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
    const data = await response.json();
    setList(data.data || []);
    setTimeout(() => setIsFetching(false), 2000);
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <div className={styles.container}>
          <Spinner entitie="Admins" />
        </div>
      ) : (
        <>
          <Table
            headers={['firstName', 'lastName', 'dni', 'email', 'location', 'phone']}
            data={list}
          />
        </>
      )}
    </section>
  );
}

export default Admins;
