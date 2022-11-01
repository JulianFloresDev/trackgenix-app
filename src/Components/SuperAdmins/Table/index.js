import Modal from '../Modal';

const SuperAdminsTable = ({
  list,
  deleteSA,
  setShow,
  filter,
  showModal,
  setShowModal,
  closeModal,
  setModalMessage,
  setModalTitle,
  modalTitle,
  modalMessage
}) => {
  return (
    <>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modalTitle={modalTitle}
        modalMessage={modalMessage}
      />
      <table>
        <thead>
          <tr>
            <th
              onClick={() => {
                setModalTitle = { setModalTitle };
                setModalMessage = { setModalMessage };
                setShow(3);
              }}
            >
              Create
            </th>
          </tr>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>dni</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Create At</th>
            <th>Update At</th>
          </tr>
        </thead>
        <tbody>
          {list.map((superAdmin) => {
            return (
              <tr key={superAdmin._id}>
                <td>{superAdmin.firstName}</td>
                <td>{superAdmin.lastName}</td>
                <td>{superAdmin.email}</td>
                <td>{superAdmin.dni}</td>
                <td>{superAdmin.phone}</td>
                <td>{superAdmin.location}</td>
                <td>{superAdmin.createdAt.substring(0, 10)}</td>
                <td>{superAdmin.updatedAt.substring(0, 10)}</td>
                <td>
                  <button
                    onClick={() => {
                      filter(superAdmin._id);
                      setShow(2);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteSA(superAdmin._id);
                      setShowModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SuperAdminsTable;
