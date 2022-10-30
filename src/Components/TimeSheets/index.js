import { useState } from 'react';
import { useEffect } from 'react';
import styles from './time-sheets.module.css';
import Table from './Table';
import ModifyTimesheet from './ModifyTimesheet';

const TimeSheets = () => {
  const [timesheetList, setTimesheetList] = useState([]);
  const [modifyModalControl, setModifyModalControl] = useState({
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
  const showModifyModal = (id) => {
    setModifyModalControl({
      id: id,
      modal: true
    });
  };

  // Hide edit modal
  const hideModifyModal = () => {
    setModifyModalControl({
      id: '',
      modal: false
    });
  };

  // Edit timesheet
  const editTimesheet = async (data) => {
    console.log(JSON.stringify(data));
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${modifyModalControl.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addTimesheet = async (data) => {
    console.log(JSON.stringify(data));
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
        showModifyModal={showModifyModal}
      />
      {modifyModalControl.modal && (
        <ModifyTimesheet
          modifyModalControl={modifyModalControl}
          onEdit={editTimesheet}
          onAdd={addTimesheet}
          hideModal={hideModifyModal}
        />
      )}
    </section>
  );
};

export default TimeSheets;
