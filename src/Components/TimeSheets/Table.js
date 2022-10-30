import List from './List';

function Table(props) {
  return (
    <table>
      <thead>
        <tr>
          <th id="">Id</th>
          <th id="">Date</th>
          <th id="">Description</th>
          <th id="">Employee</th>
          <th id="">Project</th>
          <th id="">Task</th>
          <th id="">Hour</th>
        </tr>
      </thead>
      <tbody>
        {props.timesheetList.map((item) => {
          return (
            <List
              key={item._id}
              timesheet={item}
              onDelete={props.onDelete}
              showModal={props.showModal}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
