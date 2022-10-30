import styles from './time-sheets.module.css';

function List(props) {
  return (
    <tr>
      <td>{props.timesheet._id}</td>
      <td>{props.timesheet.date}</td>
      <td>{props.timesheet.description}</td>
      <td>
        {props.timesheet.employee ? (
          `${props.timesheet.employee.firstName} ${props.timesheet.employee.lastName}`
        ) : (
          <span className={styles.errMsg}>Employee does not exist</span>
        )}
      </td>
      <td>
        {props.timesheet.project ? (
          props.timesheet.project.name
        ) : (
          <span className={styles.errMsg}>Project does not exist</span>
        )}
      </td>
      <td>
        {props.timesheet.task ? (
          props.timesheet.task.description
        ) : (
          <span className={styles.errMsg}>Task does not exist</span>
        )}
      </td>
      <td>{props.timesheet.hours}</td>
      <td>
        <button onClick={() => props.showModifyModal(props.timesheet._id)}>Edit</button>
        <button onClick={() => props.onDelete(props.timesheet._id)}>Delete</button>
      </td>
    </tr>
  );
}

export default List;
