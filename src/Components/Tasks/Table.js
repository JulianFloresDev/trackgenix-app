import styles from './tasks.module.css';
import List from './List';

function Table(props) {
  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th id="">Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.tasksList.map((item) => {
            return (
              <List
                key={item._id}
                task={item}
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
