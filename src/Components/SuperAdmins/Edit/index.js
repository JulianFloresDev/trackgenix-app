import { useState } from 'react';

const SuperAdminsEdit = ({ toEdit, changeShow }) => {
  const [firstName, saveFirstName] = useState(toEdit.firstName);
  const [lastName, saveLastName] = useState(toEdit.lastName);
  const [email, saveEmail] = useState(toEdit.email);
  const [password, savePassword] = useState(toEdit.password);
  const [dni, saveDni] = useState(toEdit.dni);
  const [phone, savePhone] = useState(toEdit.phone);
  const [location, saveLocation] = useState(toEdit.location);

  const editSuperAdmin = async (id) => {
    const setToEdit(SuperAdmins.find((superAdmin) => superAdmin._id === id));
    const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toEdit)
    });
    const data = await res.json();
    const newSuperAdmins = SuperAdmins.map((superAdmin) => {
      if (superAdmin._id === id) {
        superAdmin = data.data;
      }
      return superAdmin;
    });
    saveSuperAdmins(newSuperAdmins);
  };

  return (
    <div>
      <h2>Super Admins Edit</h2>
      <from>
        <div>
          <label>First Name</label>
          <input
            type="text"
            placeholder="add First Name"
            value={firstName}
            onChange={(e) => saveFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="add Last Name"
            value={lastName}
            onChange={(e) => saveLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="add Email"
            value={email}
            onChange={(e) => saveEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="add Password"
            value={password}
            onChange={(e) => savePassword(e.target.value)}
          />
        </div>
        <div>
          <label>dni</label>
          <input
            type="number"
            placeholder="add dni"
            value={dni}
            onChange={(e) => saveDni(e.target.value)}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="number"
            placeholder="add Phone"
            value={phone}
            onChange={(e) => savePhone(e.target.value)}
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            placeholder="add Location"
            value={location}
            onChange={(e) => saveLocation(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Save"
          onClick={() => {
            editSuperAdmin(toEdit._id);
            changeShow();
          }}
        />
      </from>
    </div>
  );
};

export default SuperAdminsEdit;
