import { useState } from 'react';

const superAdminsEdit = ({ onFind, onShow }) => {
  const superAdmin = onFind();
  const [firstName, saveFirstName] = useState(superAdmin.firstName);
  const [lastName, saveLastName] = useState(superAdmin.lastName);
  const [email, saveEmail] = useState(superAdmin.email);
  const [password, savePassword] = useState(superAdmin.password);
  const [dni, saveDni] = useState(superAdmin.dni);
  const [phone, savePhone] = useState(superAdmin.phone);
  const [location, saveLocation] = useState(superAdmin.location);

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
        <input type="submit" value="Save" onClick={() => onShow(false)} />
      </from>
    </div>
  );
};

export default superAdminsEdit;
