import Table from '../Share/Table';
import styles from './tasks.module.css';
import Spinner from '../Share/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../../redux/tasks/thunks';
import { useEffect } from 'react';

function Tasks() {
  const { list, isFetching, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks(''));
  }, []);

  return (
    <section className={styles.container}>
      {isFetching ? (
        <div className={styles.container}>
          <Spinner entitie="Tasks" />
        </div>
      ) : error ? (
        <div>
          <h2>404: server not found</h2>
        </div>
      ) : (
        <Table headers={['description', 'createdAt', 'updatedAt']} data={list} />
      )}
    </section>
  );
}

export default Tasks;
