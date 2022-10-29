import { useState, useEffect } from 'react';
import styles from './super-admins.module.css';
import SuperAdminsTable from './Table';

function SuperAdmins() {
  const [SuperAdmins, saveSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      saveSuperAdmins(data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(SuperAdmins);

  return (
    <section className={styles.container}>
      <SuperAdminsTable />
    </section>
  );
}

export default SuperAdmins;
