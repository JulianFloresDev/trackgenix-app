import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { getTimesheets } from 'redux/time-sheets/thunks';
import styles from './projects.module.css';
import { Table, Spinner, NotFound } from 'Components/Share';

function Projects() {
  const dispatch = useDispatch();
  const { role, email } = useSelector((store) => store.auth);
  const { list: projectsList, isFetching, error } = useSelector((store) => store.projects);
  const { list: timesheetList } = useSelector((store) => store.timeSheets);
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
            <NotFound />
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
              data={
                role === 'employee'
                  ? projectsList.filter(
                      (project) =>
                        project.employeePM?.employee?.email === email ||
                        project.teamMembers?.find((member) => member.employee?.email === email)
                    )
                  : projectsList
              }
              filteredTimesheets={
                role === 'employee' && timesheetList?.filter((ts) => ts.employee?.email === email)
              }
              editable={role === 'admin' && { edit: true, remove: true, add: true }}
            />
          )}
        </>
      )}
    </section>
  );
}
export default Projects;
