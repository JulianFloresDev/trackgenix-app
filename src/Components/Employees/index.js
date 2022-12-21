import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';
import styles from './employees.module.css';
import { Table, Spinner, NotFound } from 'Components/Share';

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

export default Employees;
