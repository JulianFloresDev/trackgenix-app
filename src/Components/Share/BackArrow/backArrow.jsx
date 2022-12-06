import { useHistory } from 'react-router-dom';
import backArrowStyles from 'Components/Share/BackArrow/backArrow.module.css';

const BackArrow = ({ pushTo }) => {
  const history = useHistory();
  return (
    <img
      src={`${process.env.PUBLIC_URL}/assets/images/back-arrow.svg`}
      className={backArrowStyles.backArrow}
      onClick={
        pushTo
          ? () => {
              history.push(pushTo);
            }
          : () => {
              history.goBack();
            }
      }
    />
  );
};

export default BackArrow;
