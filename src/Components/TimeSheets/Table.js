import styles from './time-sheets.module.css';
import List from './List';

function Table(props) {
  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th id="">Date</th>
            <th id="">Description</th>
            <th id="">Employee</th>
            <th id="">Project</th>
            <th id="">Task</th>
            <th id="">Hour</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.timesheetList.map((item) => {
            return (
              <List
                key={item._id}
                timesheet={item}
                onDelete={props.onDelete}
                showModifyModal={props.showModifyModal}
              />
            );
          })}
        </tbody>
      </table>
      <button onClick={() => props.showModifyModal()}>Add New</button>
    </div>
  );
}

export default Table;
