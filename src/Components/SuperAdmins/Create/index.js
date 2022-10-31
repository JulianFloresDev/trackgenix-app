import { useState } from 'react';

const SuperAdminsCreate = ({ changeShow }) => {
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
      await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Super Admin</h2>
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
            type="number"
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
            type="number"
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
        <button
          type="submit"
          onClick={() => {
            createSuperAdmin(superAdminCreated);
            changeShow();
          }}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default SuperAdminsCreate;
