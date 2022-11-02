import Modal from '../Modal';
import styles from './table.module.css';

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
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            <th
              className={styles.createBtn}
              onClick={() => {
                setModalTitle = { setModalTitle };
                setModalMessage = { setModalMessage };
                setShow(3);
              }}
            >
              Create
            </th>
          </tr>
          <tr className={styles.header}>
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
        <tbody className={styles.tbody}>
          {list.map((superAdmin) => {
            return (
              <tr key={superAdmin._id} className={styles.row}>
                <td>{superAdmin.firstName}</td>
                <td>{superAdmin.lastName}</td>
                <td>{superAdmin.email}</td>
                <td>{superAdmin.dni}</td>
                <td>{superAdmin.phone}</td>
                <td>{superAdmin.location}</td>
                <td>{superAdmin.createdAt.substring(0, 10)}</td>
                <td>{superAdmin.updatedAt.substring(0, 10)}</td>
                <td className={styles.buttons}>
                  <button
                    className={styles.editBtn}
                    onClick={() => {
                      filter(superAdmin._id);
                      setShow(2);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
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
