import { useState } from 'react';
import Modal from '../Modal';

const SuperAdminsEdit = ({
  SuperAdminsToEdit,
  changeShow,
  showModal,
  setShowModal,
  closeModal,
  setModalMessage,
  setModalTitle,
  modalTitle,
  modalMessage
}) => {
  const [superAdminEdited, setSuperAdminCreated] = useState({
    firstName: SuperAdminsToEdit.firstName,
    lastName: SuperAdminsToEdit.lastName,
    email: SuperAdminsToEdit.email,
    password: SuperAdminsToEdit.password,
    dni: SuperAdminsToEdit.dni.toString(),
    phone: SuperAdminsToEdit.phone.toString(),
    location: SuperAdminsToEdit.location
  });

  const editSuperAdmin = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdminEdited)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error === false) {
            setModalTitle('Success');
            setModalMessage(res.message.toString());
          } else {
            setModalTitle('Error');
            setModalMessage(res.message[0].message);
          }
        });
    } catch (error) {
      console.log('error', error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Super Admins Edit</h2>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modalTitle={modalTitle}
        modalMessage={modalMessage}
      />
      <from>
        <div>
          <label>First Name</label>
          <input
            type="text"
            placeholder="add First Name"
            value={superAdminEdited.firstName}
            onChange={(e) => {
              setSuperAdminCreated({
                ...superAdminEdited,
                firstName: e.target.value
              });
            }}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="add Last Name"
            value={superAdminEdited.lastName}
            onChange={(e) => {
              setSuperAdminCreated({
                ...superAdminEdited,
                lastName: e.target.value
              });
            }}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="add Email"
            value={superAdminEdited.email}
            onChange={(e) => {
              setSuperAdminCreated({
                ...superAdminEdited,
                email: e.target.value
              });
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="add Password"
            value={superAdminEdited.password}
            onChange={(e) => {
              setSuperAdminCreated({
                ...superAdminEdited,
                password: e.target.value
              });
            }}
          />
        </div>
        <div>
          <label>Dni</label>
          <input
            type="text"
            placeholder="add dni"
            value={superAdminEdited.dni}
            onChange={(e) => {
              setSuperAdminCreated({
                ...superAdminEdited,
                dni: e.target.value
              });
            }}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            placeholder="add Phone"
            value={superAdminEdited.phone}
            onChange={(e) => {
              setSuperAdminCreated({
                ...superAdminEdited,
                phone: e.target.value
              });
            }}
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            placeholder="add Location"
            value={superAdminEdited.location}
            onChange={(e) => {
              setSuperAdminCreated({
                ...superAdminEdited,
                location: e.target.value
              });
            }}
          />
        </div>
        <input
          type="submit"
          value="Save"
          onClick={() => {
            editSuperAdmin(SuperAdminsToEdit._id);
            setShowModal(true);
          }}
        />
        <button onClick={() => changeShow()}>Close</button>
      </from>
    </div>
  );
};

export default SuperAdminsEdit;
