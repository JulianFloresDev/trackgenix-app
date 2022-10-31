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
      const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await res.json();
      saveSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, [show]);

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
      const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toEdit)
      });
      const data = await res.json();
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

  const changeShow = () => {
    setShow(1);
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
      {show === 2 && <SuperAdminsEdit toEdit={toEdit} changeShow={changeShow} />}
      {show === 3 && <SuperAdminsCreate changeShow={changeShow} />}
    </section>
  );
}

export default SuperAdmins;
