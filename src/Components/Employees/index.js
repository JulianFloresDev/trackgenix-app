import styles from './employees.module.css';
// import { useState, useEffect } from 'react';
import Table from '../Share/Table';
import Spinner from '../Share/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../../redux/employees/thunks';
import { useEffect } from 'react';

function Employees() {
  const { list, isFetching, error } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployees(''));
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <div className={styles.container}>
          <Spinner entitie="Employees" />
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

export default Employees;
