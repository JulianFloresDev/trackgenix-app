import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';
import styles from './employees.module.css';
import Table from 'Components/Share/Table';
import Spinner from 'Components/Share/Spinner';

function Employees() {
  const { list, isFetching, error } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployees(''));
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <Spinner entitie="Employees" />
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

export default Employees;
