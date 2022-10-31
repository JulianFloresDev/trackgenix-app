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
      saveSuperAdmins(data.data || []);
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

  const filterOneSuperAdmin = (id) => {
    setToEdit(SuperAdmins.filter((superAdmin) => superAdmin._id === id)[0]);
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
          filter={filterOneSuperAdmin}
        />
      )}
      {show === 2 && <SuperAdminsEdit changeShow={changeShow} SuperAdminsToEdit={toEdit} />}
      {show === 3 && <SuperAdminsCreate changeShow={changeShow} />}
    </section>
  );
}

export default SuperAdmins;
