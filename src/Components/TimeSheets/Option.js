function OptionEmployees(props) {
  return (
    <option
      value={props.employee._id}
    >{`${props.employee.firstName} ${props.employee.lastName}`}</option>
  );
}

function OptionProjects(props) {
  return <option value={props.project._id}>{props.project.name}</option>;
}

function OptionTasks(props) {
  return <option value={props.task._id}>{props.task.description}</option>;
}

export default {
  OptionEmployees,
  OptionProjects,
  OptionTasks
};
