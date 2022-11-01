import { useState } from 'react';
import { useEffect } from 'react';
import styles from './time-sheets.module.css';
import Table from './Table';
import ModifyTimesheet from './ModifyTimesheet';
import SuccessModal from './SuccessModal';

const TimeSheets = () => {
  const [timesheetList, setTimesheetList] = useState([]);
  const [modifyModalControl, setModifyModalControl] = useState({ id: '', modal: false });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`);
      const data = await response.json();
      setTimesheetList(data.data);
    } catch (err) {
      console.log(err);
    }
  }, [modifyModalControl]);

  // Delete Timesheet
  const deleteTimesheet = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
        method: 'DELETE'
      });
      setSuccessMessage('Timesheet deleted successufully');
      setTimeout(() => setSuccessMessage(''), 2000);
      setTimesheetList([...timesheetList.filter((item) => item._id !== id)]);
    } catch (error) {
      console.log(error);
    }
  };

  // Show edit modal
  const showModifyModal = (id) => {
    setModifyModalControl({ id: id, modal: true });
  };

  // Hide edit modal
  const hideModifyModal = () => {
    setModifyModalControl({ id: '', modal: false });
    setErrorMessage('');
  };

  // Edit timesheet
  const editTimesheet = async (data) => {
    try {
      const req = await fetch(
        `${process.env.REACT_APP_API_URL}/time-sheets/${modifyModalControl.id}`,
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
      console.log(error);
    }
  };

  const addTimesheet = async (data) => {
    console.log(JSON.stringify(data));
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
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </section>
  );
};

export default TimeSheets;
