import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { getTimesheets } from 'redux/time-sheets/thunks';
import styles from './projects.module.css';
import { Table, Spinner } from 'Components/Share';

function Projects() {
  const dispatch = useDispatch();
  const { role } = useSelector((store) => store.auth);
  const { list: projectsList, isFetching, error } = useSelector((store) => store.projects);
  const { list: timesheetList } = useSelector((store) => store.timeSheets);
  const { user } = useSelector((state) => state.global);
  useEffect(async () => {
    dispatch(getProjects(''));
    dispatch(getTimesheets(''));
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <Spinner entitie="Projects" />
      ) : (
        <>
          {error ? (
            <div className={styles.container}>
              <h2>404: Unable to access server</h2>
            </div>
          ) : role === 'employee' ? (
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
              data={projectsList.filter((project) =>
                project.teamMembers.find((member) => member.employee?._id === user._id)
              )}
              filteredTimesheets={timesheetList.filter((ts) => ts.employee?._id === user._id)}
            />
          ) : role === 'super-admin' ? (
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
              data={projectsList}
              editable={{ add: true }}
            />
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
              data={projectsList}
            />
          )}
        </>
      )}
    </section>
  );
}
export default Projects;
