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
  const [modalResponse, setModalResponse] = useState({
    modalTittle: 'Empty Modal!',
    modalMessage: undefined
  });

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
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/Json'
        },
        body: JSON.stringify(newData)
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log(responseJSON);
          if (!responseJSON.error) {
            setModalResponse({
              modalTittle: 'Successful create!',
              modalMessage: responseJSON.message.toString()
            });
          } else {
            setModalResponse({
              modalTittle: 'ERROR!',
              modalMessage: responseJSON.message[0].message.toString()
            });
          }
          setShowModal(true);
        });
    } catch (error) {
      setShowModal(true);
      console.error(error);
    }
    setShow(1);
  };

  const selectEdit = async (id) => {
    setToEdit(Admins.find((admin) => admin._id === id));
    setShow(2);
  };

  const editAdmin = async (id, newData) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/Json'
        },
        body: JSON.stringify(newData)
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log(responseJSON);
          if (!responseJSON.error) {
            setModalResponse({
              modalTittle: 'Successful edit!',
              modalMessage: responseJSON.message.toString()
            });
          } else {
            setModalResponse({
              modalTittle: 'ERROR!',
              modalMessage: responseJSON.message[0].message.toString()
            });
          }
          setShowModal(true);
        });
    } catch (error) {
      setShowModal(true);
      console.error(error);
    }
    setShow(1);
  };

  const deleteAdmin = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'DELETE'
      }).then((response) => {
        console.log(response);
        if (response.status === 204) {
          setModalResponse({
            modalTittle: 'Successful delete!',
            modalMessage: 'The admin was deleted successfully'
          });
        } else {
          setModalResponse({
            modalTittle: 'ERROR!',
            modalMessage: 'There was an error deleting the admin'
          });
        }
      });

      const updatedAdmins = Admins.filter((admin) => admin._id !== id);
      saveAdmins(updatedAdmins);

      setShowModal(true);
    } catch (error) {
      setShowModal(true);
      console.error(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalResponse({ modalTittle: 'Empty Modal!', modalMessage: undefined });
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
          modalResponse={modalResponse}
        />
      )}
      {show === 2 && (
        <Edit
          editAdmin={editAdmin}
          toEdit={toEdit}
          setShow={setShow}
          showModal={showModal}
          closeModal={closeModal}
          modalResponse={modalResponse}
        />
      )}
      {show === 3 && (
        <Create
          createAdmin={createAdmin}
          setShow={setShow}
          showModal={showModal}
          closeModal={closeModal}
          modalResponse={modalResponse}
        />
      )}
    </section>
  );
}

export default Admins;
