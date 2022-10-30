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
      console.log(responseJson);
      saveAdmins(responseJson.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section className={styles.container}>
      {show === 1 && <Table list={Admins} setShow={setShow} />}
    </section>
  );
}

export default Admins;
