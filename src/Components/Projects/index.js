import styles from './projects.module.css';
import { useEffect } from 'react';
import Table from '../Share/Table';
import Spinner from '../Share/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../../redux/projects/thunks';

function Projects() {
  const dispatch = useDispatch();
  const { list, isFetching, error } = useSelector((store) => store.projects);
  useEffect(async () => {
    dispatch(getProjects(''));
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <div className={styles.container}>
          <Spinner entitie="Projects" />
        </div>
      ) : (
        <>
          {error ? (
            <div>
              <h2>404: Unable to access server</h2>
            </div>
          ) : (
            <Table
              headers={[
                'name',
                'description',
                'clientName',
                'startDate',
                'endDate',
                'teamMembers',
                'active'
              ]}
              data={list}
            />
          )}
        </>
      )}
    </section>
  );
}
export default Projects;
