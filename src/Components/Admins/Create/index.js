import { useState } from 'react';
import Modal from '../Modal';

const adminCreate = ({ createAdmin, showModal, closeModal }) => {
  const [firstName, saveFirstName] = useState();
  const [lastName, saveLastName] = useState();
  const [email, saveEmail] = useState();
  const [password, savePassword] = useState();
  const [dni, saveDni] = useState();
  const [phone, savePhone] = useState();
  const [location, saveLocation] = useState();

  return (
    <div>
      <Modal showModal={showModal} closeModal={closeModal} />
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
            type="text"
            placeholder="add dni"
            value={dni}
            onChange={(e) => saveDni(e.target.value)}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
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
            const newData = {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
              dni: dni.toString(),
              phone: phone.toString(),
              location: location
            };
            createAdmin(newData);
          }}
        />
      </from>
    </div>
  );
};

export default adminCreate;
