import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Table from './Table';
import Input from './Input';
import EditEmployeeModal from './Edit';

function Employees() {
  const [employees, saveEmployees] = useState([]);
  const [filteredEmployees, saveFilteredEmployees] = useState(employees);
  const [modalState, toggleModalState] = useState(false);

  const getAllEmployees = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response.data || []);
        saveFilteredEmployees(response.data || []);
      });
  };

  useEffect(getAllEmployees, []);

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

  const editEmployee = async (employee) => {
    if (modalState) {
      await fetch(`${process.env.REACT_APP_API_URL}/employees/${employee._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phone: parseInt(employee.phone, 10),
          address: employee.address
        })
      });
      getAllEmployees();
    }

    toggleModalState(!modalState);
  };

  const closeModal = () => {
    toggleModalState(!modalState);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.item}>Employee List</h2>
        <Input filterEmployees={filterEmployees} />
      </div>
      {modalState ? (
        <EditEmployeeModal
          employee={employees[0]}
          closeModal={closeModal}
          editEmployee={editEmployee}
        />
      ) : (
        <Table
          list={filteredEmployees}
          deleteEmployee={deleteEmployee}
          editEmployee={editEmployee}
        />
      )}
    </section>
  );
}

export default Employees;
