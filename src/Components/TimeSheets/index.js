import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheets } from 'redux/time-sheets/thunks';
import styles from './time-sheets.module.css';
import { Table, Spinner, NotFound } from 'Components/Share';

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
        <NotFound />
      ) : (
        <Table
          headers={
            role === 'employee'
              ? ['project', 'description', 'task', 'date', 'hours']
              : ['employee', 'project', 'description', 'task', 'date', 'hours']
          }
          data={
            role === 'employee'
              ? list?.filter((item) => item.employee?.email === email)
              : list?.filter((item) => item.employee && item.project)
          }
          editable={role === 'employee' && { edit: true, remove: true, add: true }}
        />
      )}
    </section>
  );
}

export default TimeSheets;
