import { useState, useEffect } from 'react';
import styles from './super-admins.module.css';
import SuperAdminsTable from './Table';
import SuperAdminsEdit from './Edit';

function SuperAdmins() {
  const [SuperAdmins, saveSuperAdmins] = useState([]);
  const [showTable, setShowTable] = useState(true);

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

  const editSuperAdmin = async (id) => {
    const superAdmin = SuperAdmins.find((superAdmin) => superAdmin._id === id);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(superAdmin)
    });
    const data = await response.json();
    const newSuperAdmins = SuperAdmins.map((superAdmin) => {
      if (superAdmin._id === id) {
        superAdmin = data.data;
      }
      return superAdmin;
    });
    saveSuperAdmins(newSuperAdmins);
  };

  // const createSuperAdmin = async (superAdmin) => {
  //   const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(superAdmin)
  //   });
  //   const data = await response.json();
  //   saveSuperAdmins([...SuperAdmins, data.data]);
  // };

  return (
    <section className={styles.container}>
      <h2>Super Admins</h2>
      <div>
        {showTable ? (
          <SuperAdminsTable
            list={SuperAdmins}
            onDelete={deleteSuperAdmin}
            onEdit={editSuperAdmin}
            onShow={setShowTable}
          />
        ) : (
          <SuperAdminsEdit onShow={setShowTable} />
        )}
      </div>
    </section>
  );
}

export default SuperAdmins;
