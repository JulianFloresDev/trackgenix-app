import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import styles from './projects.module.css';
import { Table, Spinner } from 'Components/Share';

function Projects() {
  const dispatch = useDispatch();
  const { list, isFetching, error } = useSelector((store) => store.projects);
  useEffect(async () => {
    dispatch(getProjects(''));
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <Spinner entitie="Projects" />
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
                'startDate',
                'clientName',
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
