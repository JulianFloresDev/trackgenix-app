import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimesheets } from 'redux/time-sheets/thunks';
import { getEmployees } from 'redux/employees/thunks';

import styles from './home.module.css';
import { Table } from 'Components/Share';

function Home() {
  const dispatch = useDispatch();
  const { list: timeSheetsList } = useSelector((state) => state.timeSheets);
  const { itemToPUT } = useSelector((state) => state.global);
  useEffect(() => {
    dispatch(getEmployees('636c1e8ddabe537336ae082a'));
    dispatch(getTimesheets(''));
  }, []);
  return (
    <section className={styles.container}>
      <h2>Employee Jorge Fix</h2>
      <Table
        headers={['projects', 'tasks', 'hours', 'date']}
        data={timeSheetsList.filter((timeSheet) => timeSheet.employee === itemToPUT._id)}
      />
    </section>
  );
}

export default Home;
