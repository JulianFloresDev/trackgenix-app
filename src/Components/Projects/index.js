import styles from './projects.module.css';
import { useState, useEffect } from 'react';
import Table from '../Share/Table';

function Projects() {
  const [list, setList] = useState([]);
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
    const data = await response.json();
    setList(data.data || []);
  }, []);
  return (
    <section className={styles.container}>
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
    </section>
  );
}
export default Projects;
