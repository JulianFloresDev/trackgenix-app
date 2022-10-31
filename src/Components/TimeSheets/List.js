import styles from './time-sheets.module.css';

function List(props) {
  const day = props.timesheet.date.substring(8, 10);
  const month = props.timesheet.date.substring(5, 7);
  const year = props.timesheet.date.substring(0, 4);
  const dateNewFormat = `${day}-${month}-${year}`;
  return (
    <tr title={`ID: ${props.timesheet._id}`}>
      <td>{dateNewFormat}</td>
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
      <td>{`${props.timesheet.hours} hs`}</td>
      <td className={styles.imgTd}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/edit.svg`}
          onClick={() => props.showModifyModal(props.timesheet._id)}
        />
        <img
          className={styles.deleteImg}
          src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`}
          onClick={() => props.onDelete(props.timesheet._id)}
        />
      </td>
    </tr>
  );
}

export default List;
