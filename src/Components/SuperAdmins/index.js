import styles from './super-admins.module.css';
import Table from '../Share/Table';
import Spinner from '../Share/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getSuperAdmins } from '../../redux/super-admins/thunks';
import { useEffect } from 'react';

function SuperAdmins() {
  const { list, isFetching, error } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSuperAdmins(''));
  }, []);

  return (
    <section className={styles.container}>
      {isFetching ? (
        <div className={styles.container}>
          <Spinner entitie="Super-Admins" />
        </div>
      ) : error ? (
        <div>
          <h2>404: server not found</h2>
        </div>
      ) : (
        <Table
          headers={['firstName', 'lastName', 'dni', 'email', 'location', 'phone']}
          data={list}
        />
      )}
    </section>
  );
}

export default SuperAdmins;
