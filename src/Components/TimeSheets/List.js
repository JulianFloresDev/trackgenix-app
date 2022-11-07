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
        {props.timesheet.employee
          ? `${props.timesheet.employee.firstName} ${props.timesheet.employee.lastName}`
          : props.onDelete(props.timesheet._id)}
      </td>
      <td>
        {props.timesheet.project
          ? props.timesheet.project.name
          : props.onDelete(props.timesheet._id)}
      </td>
      <td>
        {props.timesheet.task
          ? props.timesheet.task.description
          : props.onDelete(props.timesheet._id)}
      </td>
      <td>{`${props.timesheet.hours} hs`}</td>
      <td>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/edit.svg`}
          onClick={() =>
            props.showModifyModal(
              props.timesheet._id,
              props.timesheet.date,
              props.timesheet.description,
              props.timesheet.employee,
              props.timesheet.project,
              props.timesheet.task,
              props.timesheet.hours
            )
          }
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`}
          onClick={() => props.onDelete(props.timesheet._id)}
        />
      </td>
    </tr>
  );
}

export default List;
