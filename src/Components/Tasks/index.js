import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from 'redux/tasks/thunks';
import styles from './tasks.module.css';
import { Table, Spinner, NotFound } from 'Components/Share';

function Tasks() {
  const { list, isFetching, error } = useSelector((state) => state.tasks);
  const { role } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.global);
  const { list: projectList } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks(''));
  }, []);

  return (
    <section className={styles.container}>
      {isFetching ? (
        <Spinner entitie="Tasks" />
      ) : error ? (
        <NotFound />
      ) : (
        <Table
          headers={['type', 'createdAt', 'updatedAt']}
          data={list}
          editable={
            role === 'admin'
              ? { edit: true, remove: true, add: true }
              : projectList?.some((project) => project.employeePM?.employee?._id === user._id)
              ? { edit: false, remove: false, add: true }
              : { edit: false, remove: false, add: false }
          }
        />
      )}
    </section>
  );
}

export default Tasks;
