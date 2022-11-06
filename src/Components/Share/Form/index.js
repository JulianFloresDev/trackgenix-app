import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Form = () => {
  const [data, setData] = useState({});
  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const id = URLPath[URLPath.length - 1];
  const entitie = URLPath[1];

  useEffect(async () => {
    const request = await fetch(`${process.env.REACT_APP_API_URL}/${entitie}/${id}`);
    const response = await request.json();
    setData(response.data || {});
  }, []);

  return (
    <section>
      <form>
        <div>
          <label></label>
          <input
            type="text"
            name="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
        <div>
          <button>Submit</button>
          <button>Close</button>
        </div>
      </form>
    </section>
  );
};

export default Form;
