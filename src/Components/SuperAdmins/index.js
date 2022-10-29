import { useState, useEffect } from 'react';
import styles from './super-admins.module.css';
import SuperAdminsTable from './Table';

function SuperAdmins() {
  const [SuperAdmins, saveSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      saveSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteSuperAdmin = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'DELETE'
    });
    const newSuperAdmins = SuperAdmins.filter((superAdmin) => superAdmin._id !== id);
    saveSuperAdmins(newSuperAdmins);
  };

  return (
    <section className={styles.container}>
      <h2>Super Admins</h2>
      <div>
        <SuperAdminsTable list={SuperAdmins} onDelete={deleteSuperAdmin} />
      </div>
    </section>
  );
}

export default SuperAdmins;
