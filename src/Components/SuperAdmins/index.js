import { useState, useEffect } from 'react';
import styles from './super-admins.module.css';
import SuperAdminsTable from './Table';
import SuperAdminsEdit from './Edit';
import SuperAdminsCreate from './Create';
//import Modal from './Modal';

function SuperAdmins() {
  const [SuperAdmins, saveSuperAdmins] = useState([]);
  const [show, setShow] = useState(1);
  const [toEdit, setToEdit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

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
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'DELETE'
      }).then((res) => {
        if (res.status === 204) {
          setModalTitle('Super Admin Deleted');
          setModalMessage('The Super Admin was deleted successfully');
          setShowModal(true);
        } else {
          setModalTitle('Error');
          setModalMessage('There was an error deleting the Super Admin');
          setShowModal(true);
        }
        setShow(1);
      });
    } catch (error) {
      console.error(error);
    }
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
          setModalMessage={setModalMessage}
          setModalTitle={setModalTitle}
          modalTitle={modalTitle}
          modalMessage={modalMessage}
        />
      )}
      {show === 2 && (
        <SuperAdminsEdit
          changeShow={changeShow}
          SuperAdminsToEdit={toEdit}
          showModal={showModal}
          setShowModal={setShowModal}
          closeModal={closeModal}
          setModalMessage={setModalMessage}
          setModalTitle={setModalTitle}
          modalTitle={modalTitle}
          modalMessage={modalMessage}
        />
      )}
      {show === 3 && (
        <SuperAdminsCreate
          changeShow={changeShow}
          showModal={showModal}
          setShowModal={setShowModal}
          closeModal={closeModal}
          setModalMessage={setModalMessage}
          setModalTitle={setModalTitle}
          modalTitle={modalTitle}
          modalMessage={modalMessage}
        />
      )}
    </section>
  );
}

export default SuperAdmins;
