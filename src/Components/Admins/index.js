import { useEffect, useState } from 'react';
import Table from './Table';
import Create from './Create';
import Edit from './Edit';
import styles from './admins.module.css';

function Admins() {
  const [Admins, saveAdmins] = useState([]);
  const [show, setShow] = useState(1);
  const [toEdit, setToEdit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState({ type: 'None', error: false });

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const responseJson = await response.json();
      saveAdmins(responseJson.data);
    } catch (error) {
      console.error(error);
    }
  }, [show, showModal]);

  const createAdmin = async (newData) => {
    await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/Json'
      },
      body: JSON.stringify(newData)
    });
    setShowModal(true);
    setShow(1);
  };

  const selectEdit = async (id) => {
    setToEdit(Admins.find((admin) => admin._id === id));
    setShow(2);
  };

  const editAdmin = async (id, newData) => {
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/Json'
      },
      body: JSON.stringify(newData)
    });
    setShowModal(true);
    setShow(1);
  };

  const deleteAdmin = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE'
    });

    const updatedAdmins = Admins.filter((admin) => admin._id !== id);
    saveAdmins(updatedAdmins);

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalSuccess.type('None');
    setModalSuccess.error(false);
  };

  return (
    <section className={styles.container}>
      {show === 1 && (
        <Table
          list={Admins}
          selectEdit={selectEdit}
          deleteAdmin={deleteAdmin}
          setShow={setShow}
          showModal={showModal}
          closeModal={closeModal}
          modalSuccess={modalSuccess}
        />
      )}
      {show === 2 && (
        <Edit
          editAdmin={editAdmin}
          toEdit={toEdit}
          setShow={setShow}
          showModal={showModal}
          closeModal={closeModal}
          modalSuccess={modalSuccess}
        />
      )}
      {show === 3 && (
        <Create
          createAdmin={createAdmin}
          setShow={setShow}
          showModal={showModal}
          closeModal={closeModal}
          modalSuccess={modalSuccess}
        />
      )}
    </section>
  );
}

export default Admins;
