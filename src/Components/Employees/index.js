import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Table from './Table';
import Input from './Input';

function Employees() {
  const [employees, saveEmployees] = useState([]);
  const [filteredEmployees, saveFilteredEmployees] = useState(employees);

  const filterEmployees = (event) => {
    saveFilteredEmployees(
      employees.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(event.target.value.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        saveEmployees(response.data);
        saveFilteredEmployees(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.h2}>Employee List</h2>
        <Input filterEmployees={filterEmployees} />
      </div>
      <Table list={filteredEmployees} />
    </section>
  );
}

export default Employees;
