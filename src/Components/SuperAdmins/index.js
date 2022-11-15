import styles from './super-admins.module.css';
// import { useEffect } from 'react';
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

  // useEffect(async () => {
  //   const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
  //   const data = await response.json();
  //   setList(data.data || []);
  //   setTimeout(() => setIsFetching(false), 2000);
  // }, []);
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
