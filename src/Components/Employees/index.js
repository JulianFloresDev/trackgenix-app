import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Table from './Table';
import Input from './Input';
import Form from './Form';

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
      console.error(error);
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
    saveFilteredEmployees(employees.filter((employee) => employee._id !== id));
  };

  const renderEmployeePage = (n) => {
    getAllEmployees();
    renderPage(n);
  };

  const filterEmployeeToEdit = (id) => {
    setEmployeeToEdit(employees.find((employee) => employee._id === id) || {});
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
        <Form
          render={renderEmployeePage}
          employee={{
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            dni: '',
            location: ''
          }}
          modalState={modalState}
          setModalState={setModalState}
          METHOD={'POST'}
          buttonMsg={'Create'}
        />
      )}
      {page === 2 && (
        <Form
          render={renderEmployeePage}
          employee={employeeToEdit}
          modalState={modalState}
          setModalState={setModalState}
          METHOD={'PUT'}
          buttonMsg={'Update'}
        />
      )}
    </section>
  );
}

export default Employees;
