const superAdminsTable = ({ list }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Name</th>
          <th>Sector</th>
          <th>Project</th>
          <th>Employees</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>CONTINUAR{list}</td>;
        </tr>
      </tbody>
    </table>
  );
};

export default superAdminsTable;
