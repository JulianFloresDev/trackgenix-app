import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Table from './Table';
import Input from './Input';

function Employees() {
  const [employees, saveEmployees] = useState([]);
  const [filteredEmployees, saveFilteredEmployees] = useState(employees);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response.data);
        saveFilteredEmployees(response.data);
      });
  }, []);

  const filterEmployees = (event) => {
    saveFilteredEmployees(
      employees.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(event.target.value.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const deleteEmployee = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'DELETE'
    });
    saveFilteredEmployees(employees.filter((employee) => employee._id !== id));
    saveEmployees(employees.filter((employee) => employee._id !== id));
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.item}>Employee List</h2>
        <Input filterEmployees={filterEmployees} />
      </div>
      <Table list={filteredEmployees} deleteEmployee={deleteEmployee} />
    </section>
  );
}

export default Employees;
