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
  const [firstName, saveFirstName] = useState();
  const [lastName, saveLastName] = useState();
  const [email, saveEmail] = useState();
  const [password, savePassword] = useState();
  const [dni, saveDni] = useState();
  const [phone, savePhone] = useState();
  const [location, saveLocation] = useState();

  const createSuperAdmin = async (superAdmin) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error === false) {
            setModalTitle('Success');
            setModalMessage(res.message);
          } else {
            setModalTitle('Error');
            setModalMessage(res.message[0].message);
          }
        });
    } catch (error) {
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
              saveFirstName(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="add Last Name"
            onChange={(e) => {
              saveLastName(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="add Email"
            onChange={(e) => {
              saveEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="add Password"
            onChange={(e) => {
              savePassword(e.target.value);
            }}
          />
        </div>
        <div>
          <label>dni</label>
          <input
            type="text"
            placeholder="add dni"
            onChange={(e) => {
              saveDni(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            placeholder="add Phone"
            onChange={(e) => {
              savePhone(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            placeholder="add Location"
            onChange={(e) => {
              saveLocation(e.target.value);
            }}
          />
        </div>
        <input
          type="button"
          value="Create"
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
            createSuperAdmin(newData);
            setShowModal(true);
          }}
        />
        <input type="submit" value="Close" onClick={() => changeShow()} />
      </form>
    </div>
  );
};

export default SuperAdminsCreate;
