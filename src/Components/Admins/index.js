import { useEffect, useState } from 'react';
import styles from './admins.module.css';

function Admins() {
  const [admins, saveAdmins] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => response.json())
      .then((response) => {
        saveAdmins(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <div>
        {admins.map((admin) => {
          return <div key={admin._id}>{admin.name}</div>;
        })}
      </div>
    </section>
  );
}

export default Admins;
