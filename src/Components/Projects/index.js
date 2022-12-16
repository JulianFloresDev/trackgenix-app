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
              data={
                role === 'employee'
                  ? projectsList.filter(
                      (project) =>
                        project.employeePM?.employee?._id === user._id ||
                        project.teamMembers?.find((member) => member.employee?._id === user._id)
                    )
                  : projectsList
              }
              filteredTimesheets={
                role === 'employee' && timesheetList.filter((ts) => ts.employee?._id === user._id)
              }
              editable={
                role === 'admin'
                  ? { edit: true, remove: false, add: true }
                  : role === 'super-admin' && { edit: false, remove: true, add: true }
              }
            />
          )}
        </>
      )}
    </section>
  );
}
export default Projects;
