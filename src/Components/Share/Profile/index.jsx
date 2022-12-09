import styles from './profile.module.css';
import { editItem } from 'redux/global/actions';
import { useDispatch } from 'react-redux';
import { setGlobalUser } from 'hooks/setUser';

const Profile = () => {
  const dispatch = useDispatch();
  const user = setGlobalUser();

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
