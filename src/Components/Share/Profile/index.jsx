import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editItem } from 'redux/global/actions';

const Profile = () => {
  const { list: superAdmins } = useSelector((store) => store.superAdmins);
  const { list: admins } = useSelector((store) => store.admins);
  const { list: employees } = useSelector((store) => store.employees);
  const { role } = useSelector((store) => store.auth);
  const email = sessionStorage.getItem('email');

  const user =
    superAdmins.find((users) => users.email === email) ||
    admins.find((users) => users.email === email) ||
    employees.find((users) => users.email === email) ||
    {};
  const dispatch = useDispatch();
  const history = useHistory();

  const userToShow = { ...user };
  delete userToShow['_id'];
  delete userToShow['__v'];
  delete userToShow['createdAt'];
  delete userToShow['updatedAt'];
  delete userToShow['token'];
  delete userToShow['firebaseUid'];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {Object.keys(userToShow).map((prop, index) => {
          return (
            <div key={index} className={styles.item}>
              <h4 className={styles.itemTitle}>{prop.toUpperCase()} :</h4>
              <p className={styles.itemProp}>{user[prop]}</p>
            </div>
          );
        })}
        <div className={styles.buttonEdit}>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(editItem(user));
              history.push(`/${role}s/form/${user._id}`);
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
