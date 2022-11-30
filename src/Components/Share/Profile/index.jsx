import styles from './profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { editItem } from 'redux/global/actions';

const Profile = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.global);
  const userToShow = { ...user };
  delete userToShow['_id'];
  delete userToShow['__v'];
  delete userToShow['createdAt'];
  delete userToShow['updatedAt'];
  delete userToShow['token'];

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
              // history.push(`/${user.token}/form/${user._id}`);
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
