import { useState } from 'react';
import { useEffect } from 'react';
import styles from './time-sheets.module.css';
import Table from './Table';
import ModifyTimesheet from './ModifyTimesheet';
import SuccessModal from './SuccessModal';

const TimeSheets = () => {
  const [timesheetList, setTimesheetList] = useState([]);
  const [modifyModalControl, setModifyModalControl] = useState([
    {
      date: '',
      description: '',
      employee: '',
      project: '',
      task: '',
      hours: ''
    },
    { id: '', modal: false }
  ]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`);
      const data = await response.json();
      setTimesheetList(data.data);
    } catch (error) {
      console.error(error);
    }
  }, [modifyModalControl]);

  const deleteTimesheet = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
        method: 'DELETE'
      });
      setSuccessMessage('Timesheet deleted successufully');
      setTimeout(() => setSuccessMessage(''), 2000);
      setTimesheetList([...timesheetList.filter((item) => item._id !== id)]);
    } catch (error) {
      console.error(error);
    }
  };

  const showModifyModal = (id, date, description, employee, project, task, hours) => {
    if (id) {
      setModifyModalControl([
        {
          date: date,
          description: description,
          employee: employee._id,
          project: project._id,
          task: task._id,
          hours: hours
        },
        { id: id, modal: true }
      ]);
    } else {
      setModifyModalControl([
        {
          date: date,
          description: description,
          employee: employee,
          project: project,
          task: task,
          hours: hours
        },
        { id: id, modal: true }
      ]);
    }
  };
  const hideModifyModal = () => {
    setModifyModalControl([
      {
        date: '',
        description: '',
        employee: '',
        project: '',
        task: '',
        hours: ''
      },
      { id: '', modal: false }
    ]);
    setErrorMessage('');
  };

  const editTimesheet = async (data) => {
    try {
      const req = await fetch(
        `${process.env.REACT_APP_API_URL}/time-sheets/${modifyModalControl[1].id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      );
      const res = await req.json();
      if (res.error) {
        setErrorMessage(
          res.message[0].message || res.message || 'An unexpected error has occurred'
        );
        return;
      }
      setSuccessMessage('Timesheet edited successfully' || res.message);
      setTimeout(() => setSuccessMessage(''), 2000);
      hideModifyModal();
    } catch (error) {
      console.error(error);
    }
  };

  const addTimesheet = async (data) => {
    try {
      const req = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const res = await req.json();
      if (res.error) {
        setErrorMessage(
          res.message[0].message || res.message || 'An unexpected error has occurred'
        );
        return;
      }
      setSuccessMessage('Timesheet added successfully' || res.message);
      setTimeout(() => setSuccessMessage(''), 2000);
      hideModifyModal();
    } catch (error) {
      console.error(error);
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
      {modifyModalControl[1].modal && (
        <ModifyTimesheet
          modifyModalControl={modifyModalControl}
          onEdit={editTimesheet}
          onAdd={addTimesheet}
          hideModal={hideModifyModal}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </section>
  );
};

export default TimeSheets;
