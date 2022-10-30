const table = ({ list }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>DNI</th>
          <th>Phone</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {list.map((admin) => {
          return (
            <tr key={admin._id}>
              <td>{admin._id}</td>
              <td>{admin.firstName}</td>
              <td>{admin.lastName}</td>
              <td>{admin.email}</td>
              <td>{admin.password}</td>
              <td>{admin.dni}</td>
              <td>{admin.phone}</td>
              <td>{admin.location}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default table;
