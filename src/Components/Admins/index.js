import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins } from '../../redux/admins/thunks';
import Table from '../Share/Table';
import styles from './admins.module.css';
import Spinner from '../Share/Spinner';

function Admins() {
  const dispatch = useDispatch();
  const { list, isFetching, error } = useSelector((store) => store.admins);

  useEffect(async () => {
    dispatch(getAdmins());
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <div className={styles.container}>
          <Spinner entitie="Admins" />
        </div>
      ) : (
        <>
          {error ? (
            <div>
              <h2>404: Unable to access server</h2>
            </div>
          ) : (
            <Table
              headers={['firstName', 'lastName', 'dni', 'email', 'location', 'phone']}
              data={list}
            />
          )}
        </>
      )}
    </section>
  );
}

export default Admins;
