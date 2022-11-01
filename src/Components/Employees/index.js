import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Table from './Table';
import Input from './Input';
import EditEmployeeModal from './Edit';
import CreateEmployee from './Create';

function Employees() {
  const [employees, saveEmployees] = useState([]);
  const [filteredEmployees, saveFilteredEmployees] = useState(employees);
  const [page, renderPage] = useState(0);
  const [employeeToEdit, setEmployeeToEdit] = useState({});
  const [modalState, setModalState] = useState(false);

  const getAllEmployees = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/employees`)
        .then((response) => response.json())
        .then((response) => {
          saveEmployees(response.data || []);
          saveFilteredEmployees(response.data || []);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(getAllEmployees, [page]);

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
    saveEmployees(employees.filter((employee) => employee._id !== id));
  };

  const renderEmployeePage = (n) => {
    renderPage(n);
  };

  const filterEmployeeToEdit = (id) => {
    setEmployeeToEdit(employees.filter((employee) => employee._id === id)[0] || {});
  };
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.item}>Employee List</h2>
        <Input filterEmployees={filterEmployees} />
      </div>
      {page === 0 && (
        <Table
          deleteEmployee={deleteEmployee}
          render={renderEmployeePage}
          list={filteredEmployees}
          filter={filterEmployeeToEdit}
        />
      )}
      {page === 1 && (
        <CreateEmployee
          render={renderEmployeePage}
          modalState={modalState}
          setModalState={setModalState}
        />
      )}
      {page === 2 && (
        <EditEmployeeModal
          render={renderEmployeePage}
          employee={employeeToEdit}
          modalState={modalState}
          setModalState={setModalState}
        />
      )}
    </section>
  );
}

export default Employees;
