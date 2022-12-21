import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSuperAdmins } from 'redux/super-admins/thunks';
import styles from './super-admins.module.css';
import { Table, Spinner, NotFound } from 'Components/Share';

function SuperAdmins() {
  const { list, isFetching, error } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSuperAdmins(''));
  }, []);

  return (
    <section className={styles.container}>
      {isFetching ? (
        <Spinner entitie="Super-Admins" />
      ) : error ? (
        <NotFound />
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
