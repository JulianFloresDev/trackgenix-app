import { useHistory } from 'react-router-dom';
import backArrowStyles from 'Components/Share/BackArrow/backArrow.module.css';

const BackArrow = () => {
  const history = useHistory();
  return (
    <img
      src={`${process.env.PUBLIC_URL}/assets/images/back-arrow.svg`}
      className={backArrowStyles.backArrow}
      onClick={() => history.goBack()}
    />
  );
};

export default BackArrow;
