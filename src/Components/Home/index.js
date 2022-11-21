import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimesheets } from 'redux/time-sheets/thunks';

import styles from './home.module.css';
import { Table } from 'Components/Share';
import getUser from 'redux/global/thunks';

function Home() {
  const dispatch = useDispatch();
  const { list: timeSheetsList } = useSelector((state) => state.timeSheets);
  const { user } = useSelector((state) => state.global);
  useEffect(() => {
    dispatch(getTimesheets(''));
    dispatch(getUser('636b0b63350845234e4661c3'));
  }, []);
  return (
    <>
      <h2>
        Employee {user.firstName} {user.lastName}
      </h2>
      <section className={styles.container}>
        <Table
          headers={['description', 'project', 'task', 'hours', 'date']}
          data={timeSheetsList.filter((timeSheet) => timeSheet.employee?._id === user._id)}
        />
      </section>
    </>
  );
}

export default Home;
