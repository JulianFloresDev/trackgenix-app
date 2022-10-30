const SuperAdminsCreate = () => {
  return (
    <div>
      <h2>Create Super Admin</h2>
      <form>
        <div>
          <label>First Name</label>
          <input type="text" placeholder="add First Name" />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" placeholder="add Last Name" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="add Email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="add Password" />
        </div>
        <div>
          <label>dni</label>
          <input type="number" placeholder="add dni" />
        </div>
        <div>
          <label>Phone</label>
          <input type="number" placeholder="add Phone" />
        </div>
        <div>
          <label>Location</label>
          <input type="text" placeholder="add Location" />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default SuperAdminsCreate;
