import { useState } from 'react';
import Modal from '../Modal';

const SuperAdminsCreate = ({
  changeShow,
  showModal,
  setShowModal,
  closeModal,
  setModalMessage,
  setModalTitle,
  modalTitle,
  modalMessage
}) => {
  const [superAdminCreated, setSuperAdminCreated] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dni: '',
    phone: '',
    location: ''
  });

  const createSuperAdmin = async (superAdmin) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const response = await res.json();
      console.log('response', response);
      if (response.error === false) {
        setModalTitle('Success');
        setModalMessage(response.message);
        setShowModal(true);
      } else {
        setModalTitle('Error');
        setModalMessage(response.message[0].message);
        setShowModal(true);
      }
    } catch (error) {
      console.log('error', error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Super Admin</h2>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modalTitle={modalTitle}
        modalMessage={modalMessage}
      />
      <form>
        <div>
          <label>First Name</label>
          <input
            type="text"
            placeholder="add First Name"
            onChange={(e) => {
              setSuperAdminCreated({
                ...superAdminCreated,
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
            onChange={(e) => {
              setSuperAdminCreated({
                ...superAdminCreated,
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
            onChange={(e) => {
              setSuperAdminCreated({
                ...superAdminCreated,
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
            onChange={(e) => {
              setSuperAdminCreated({
                ...superAdminCreated,
                password: e.target.value
              });
            }}
          />
        </div>
        <div>
          <label>dni</label>
          <input
            type="text"
            placeholder="add dni"
            onChange={(e) => {
              setSuperAdminCreated({
                ...superAdminCreated,
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
            onChange={(e) => {
              setSuperAdminCreated({
                ...superAdminCreated,
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
            onChange={(e) => {
              setSuperAdminCreated({
                ...superAdminCreated,
                location: e.target.value
              });
            }}
          />
        </div>
        <input
          type="submit"
          value="Create"
          onClick={() => {
            createSuperAdmin(superAdminCreated);
            setShowModal(true);
          }}
        />
        <input type="submit" value="Close" onClick={() => changeShow()} />
      </form>
    </div>
  );
};

export default SuperAdminsCreate;
