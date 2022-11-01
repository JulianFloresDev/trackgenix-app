import Modal from '../Modal';

const table = ({ list, selectEdit, deleteAdmin, setShow, showModal, closeModal, modalSuccess }) => {
  return (
    <table>
      <thead>
        <Modal showModal={showModal} closeModal={closeModal} modalSuccess={modalSuccess} />
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>DNI</th>
          <th>Phone</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {list.map((admin) => {
          return (
            <tr key={admin._id}>
              <td>{admin.firstName}</td>
              <td>{admin.lastName}</td>
              <td>{admin.email}</td>
              <td>{admin.dni}</td>
              <td>{admin.phone}</td>
              <td>{admin.location}</td>
              <td>
                <button onClick={() => selectEdit(admin._id)}>Edit</button>
                <button onClick={() => deleteAdmin(admin._id)}>Delete</button>
              </td>
            </tr>
          );
        })}
        <button onClick={() => setShow(3)}>Create</button>
      </tbody>
    </table>
  );
};

export default table;
