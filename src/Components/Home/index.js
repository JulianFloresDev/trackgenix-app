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
    dispatch(getTimesheets(''));
    dispatch(getEmployees('636b0b63350845234e4661c3'));
  }, []);
  return (
    <section className={styles.container}>
      <h2>
        Employee {itemToPUT.firstName} {itemToPUT.lastName}
      </h2>
      <Table
        headers={['project', 'task', 'hours', 'date']}
        data={timeSheetsList.filter((timeSheet) => timeSheet.employee._id === itemToPUT._id)}
      />
    </section>
  );
}

export default Home;
