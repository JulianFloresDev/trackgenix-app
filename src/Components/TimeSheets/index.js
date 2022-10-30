import { useState } from 'react';
import { useEffect } from 'react';
import styles from './time-sheets.module.css';
import Table from './Table';
import EditTimesheet from './EditTimesheet';

const TimeSheets = () => {
  const [timesheetList, setTimesheetList] = useState([]);
  const [editModalControl, setEditModalControl] = useState({
    id: '',
    modal: false
  });

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
  const showModal = async (id) => {
    setEditModalControl({
      id: id,
      modal: true
    });
  };

  // Hide edit modal
  const hideModal = async () => {
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
  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <Table timesheetList={timesheetList} onDelete={deleteTimesheet} showModal={showModal} />
      {editModalControl.modal && <EditTimesheet onEdit={editTimesheet} onHideModal={hideModal} />}
    </section>
  );
};

export default TimeSheets;
