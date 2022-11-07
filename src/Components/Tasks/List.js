function List(props) {
  return (
    <tr title={`ID: ${props.task._id}`}>
      <td>{props.task.description}</td>
      <td>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/edit.svg`}
          onClick={() => props.showModifyModal(props.task._id)}
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`}
          onClick={() => props.onDelete(props.task._id)}
        />
      </td>
    </tr>
  );
}

export default List;
