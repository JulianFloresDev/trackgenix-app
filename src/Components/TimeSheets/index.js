import styles from './time-sheets.module.css';
import Table from '../Share/Table';
import Spinner from '../Share/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheets } from '../../redux/time-sheets/thunks';
import { useEffect } from 'react';

function TimeSheets() {
  const { list, isFetching, error } = useSelector((state) => state.timeSheets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimesheets(''));
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <Spinner entitie="Time Sheets" />
      ) : error ? (
        <div>
          <h2>404: server not found</h2>
        </div>
      ) : (
        <Table
          headers={['description', 'date', 'task', 'project', 'employee', 'hours']}
          data={list}
        />
      )}
    </section>
  );
}

export default TimeSheets;
