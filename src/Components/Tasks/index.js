import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from 'redux/tasks/thunks';
import styles from './tasks.module.css';
import { Table, Spinner } from 'Components/Share';

function Tasks() {
  const { list, isFetching, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks(''));
  }, []);

  return (
    <section className={styles.container}>
      {isFetching ? (
        <Spinner entitie="Tasks" />
      ) : error ? (
        <div>
          <h2>404: server not found</h2>
        </div>
      ) : (
        <Table headers={['type', 'createdAt', 'updatedAt']} data={list} />
      )}
    </section>
  );
}

export default Tasks;
