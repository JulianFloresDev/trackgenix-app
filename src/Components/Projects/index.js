import styles from './projects.module.css';
import { useState, useEffect } from 'react';
import Table from '../Share/Table';

function Projects() {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
    const data = await response.json();
    setList(data.data || []);
    setIsFetching(false);
  }, []);
  return (
    <section className={styles.container}>
      {isFetching ? (
        <h2>Loading Projetcs . . .</h2>
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
    </section>
  );
}
export default Projects;
