import { useEffect, useState } from 'react';
import Table from './Table';
import styles from './admins.module.css';

function Admins() {
  const [Admins, saveAdmins] = useState([]);
  const [show, setShow] = useState(1);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const responseJson = await response.json();
      saveAdmins(responseJson.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteAdmin = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE'
    });

    const updatedAdmins = Admins.filter((admin) => admin._id !== id);
    saveAdmins(updatedAdmins);
  };

  return (
    <section className={styles.container}>
      {show === 1 && <Table list={Admins} deleteAdmin={deleteAdmin} setShow={setShow} />}
    </section>
  );
}

export default Admins;
