import { useState, useEffect } from 'react';
import styles from './super-admins.module.css';
import SuperAdminsTable from './Table';
import SuperAdminsEdit from './Edit';
import SuperAdminsCreate from './Create';

function SuperAdmins() {
  const [SuperAdmins, saveSuperAdmins] = useState([]);
  const [show, setShow] = useState(1);
  const [toEdit, setToEdit] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await res.json();
      saveSuperAdmins(data.data || []);
    } catch (error) {
      console.error(error);
    }
  }, [show, showModal]);

  const deleteSuperAdmin = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    console.log(data);
    const newSuperAdmins = SuperAdmins.filter((superAdmin) => superAdmin._id !== id);
    saveSuperAdmins(newSuperAdmins);
  };

  const filterOneSuperAdmin = (id) => {
    setToEdit(SuperAdmins.filter((superAdmin) => superAdmin._id === id)[0]);
  };

  const changeShow = () => {
    setShow(1);
  };

  const closeModal = () => {
    setShowModal(false);
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
          showModal={showModal}
          setShowModal={setShowModal}
          closeModal={closeModal}
        />
      )}
      {show === 2 && (
        <SuperAdminsEdit
          changeShow={changeShow}
          SuperAdminsToEdit={toEdit}
          showModal={showModal}
          setShowModal={setShowModal}
          closeModal={closeModal}
        />
      )}
      {show === 3 && (
        <SuperAdminsCreate
          changeShow={changeShow}
          showModal={showModal}
          setShowModal={setShowModal}
          closeModal={closeModal}
        />
      )}
    </section>
  );
}

export default SuperAdmins;
