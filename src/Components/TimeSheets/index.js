import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheets } from 'redux/time-sheets/thunks';
import styles from './time-sheets.module.css';
import { Table, Spinner } from 'Components/Share';

function TimeSheets() {
  const { role, email } = useSelector((state) => state.auth);
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
      ) : role === 'employee' ? (
        <Table
          headers={['project', 'description', 'task', 'date', 'hours']}
          data={list.filter((item) => item.employee?.email === email)}
          editable={{ edit: true, remove: true, add: true }}
        />
      ) : (
        <Table
          headers={['employee', 'project', 'description', 'task', 'date', 'hours']}
          data={list}
        />
      )}
    </section>
  );
}

export default TimeSheets;
