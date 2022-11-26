import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheets } from 'redux/time-sheets/thunks';
import styles from './time-sheets.module.css';
import { Table, Spinner } from 'Components/Share';

function TimeSheets() {
  const { user } = useSelector((state) => state.global);
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
      ) : user._id ? (
        <Table
          headers={['project', 'description', 'task', 'date', 'hours']}
          data={list.filter((item) => item.employee?._id === user._id)}
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
