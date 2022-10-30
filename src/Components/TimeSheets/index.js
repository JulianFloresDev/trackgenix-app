import { useState } from 'react';
import { useEffect } from 'react';
import styles from './time-sheets.module.css';
import Table from './Table';
import EditTimesheet from './EditTimesheet';
import AddTimesheet from './AddTimesheet';

const TimeSheets = () => {
  const [timesheetList, setTimesheetList] = useState([]);
  const [editModalControl, setEditModalControl] = useState({
    id: '',
    modal: false
  });
  const [addModalControl, setAddModalControl] = useState(false);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`);
      const data = await response.json();
      setTimesheetList(data.data);
    } catch (err) {
      console.log(err);
    }
  });

  // Delete Timesheet

  const deleteTimesheet = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
      method: 'DELETE'
    });
    setTimesheetList([...timesheetList.filter((item) => item._id !== id)]);
  };

  // Show edit modal
  const showEditModal = (id) => {
    setEditModalControl({
      id: id,
      modal: true
    });
  };

  // Hide edit modal
  const hideEditModal = () => {
    setEditModalControl({
      id: '',
      modal: false
    });
  };

  // Edit timesheet
  const editTimesheet = async (newData) => {
    console.log(JSON.stringify(newData));
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${editModalControl.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Show add modal
  const showAddModal = async () => {
    setAddModalControl(true);
    console.log(addModalControl);
  };

  // Hide add modal
  const hideAddModal = async () => {
    setAddModalControl(false);
    console.log(addModalControl);
  };

  const addTimesheet = async (newData) => {
    console.log(JSON.stringify(newData));
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <Table
        timesheetList={timesheetList}
        onDelete={deleteTimesheet}
        showEditModal={showEditModal}
        showAddModal={showAddModal}
      />
      {editModalControl.modal && <EditTimesheet onEdit={editTimesheet} hideModal={hideEditModal} />}
      {addModalControl && <AddTimesheet onAdd={addTimesheet} hideModal={hideAddModal} />}
    </section>
  );
};

export default TimeSheets;
