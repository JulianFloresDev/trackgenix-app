import { useState, useEffect } from 'react';
import styles from './super-admins.module.css';
import SuperAdminsTable from './Table';
import SuperAdminsEdit from './Edit';
import SuperAdminsCreate from './Create';

function SuperAdmins() {
  const [SuperAdmins, saveSuperAdmins] = useState([]);
  const [show, setShow] = useState(1);
  const [toEdit, setToEdit] = useState({});

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
    setToEdit(SuperAdmins.find((superAdmin) => superAdmin._id === id));
    if (show === 2) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toEdit)
      });
      const data = await response.json();
      const newSuperAdmins = SuperAdmins.map((superAdmin) => {
        if (superAdmin._id === id) {
          superAdmin = data.data;
        }
        return superAdmin;
      });
      saveSuperAdmins(newSuperAdmins);
      setShow(1);
    } else {
      setShow(2);
    }
  };

  const createSuperAdmin = async (superAdmin) => {
    if (show === 3) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      saveSuperAdmins([...SuperAdmins, data.data]);
      setShow(1);
    } else {
      setShow(3);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Super Admins</h2>
      {show === 1 && (
        <SuperAdminsTable
          list={SuperAdmins}
          deleteSA={deleteSuperAdmin}
          setShow={setShow}
          editSA={editSuperAdmin}
        />
      )}
      {show === 2 && <SuperAdminsEdit editSA={editSuperAdmin} toEdit={toEdit} />}
      {show === 3 && <SuperAdminsCreate createSA={createSuperAdmin} />}
    </section>
  );
}

export default SuperAdmins;
