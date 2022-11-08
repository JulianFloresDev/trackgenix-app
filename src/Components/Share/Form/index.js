import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import Modal from '../Modal';

const Form = () => {
  const [data, setData] = useState({});
  delete data['_id'];
  delete data['__v'];
  delete data['createdAt'];
  delete data['updatedAt'];

  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const id = useParams().id;
  const entitie = URLPath[1];
  const properties = Object.keys(data);

  useEffect(async () => {
    if (id !== '0') {
      const request = id && (await fetch(`${process.env.REACT_APP_API_URL}/${entitie}/${id}`));
      const response = await request.json();
      setData(response.data || {});
    }
  }, []);

  // const [errorMessage, setErrorMessage] = useState('');

  const editRow = async (newData) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/${entitie}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/Json'
        },
        body: JSON.stringify(newData)
      });
      // if (res.error) {
      //   setErrorMessage(
      //     res.message[0].message || res.message || 'An unexpected error has occurred'
      //   );
      //   console.log(errorMessage);
      //   return;
      // }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(typeof data.employee);
  return (
    <section>
      {/* <Modal></Modal> */}
      <form>
        {properties.map((prop, index) => {
          let inputType = 'text';
          prop.includes('ate') && (inputType = 'date');
          prop.includes('hours') && (inputType = 'number');
          return (
            <div key={index}>
              <label htmlFor={prop}>{prop}</label>
              <input
                id={prop}
                type={inputType}
                value={data[prop]}
                onChange={(e) => {
                  data[prop] = e.target.value;
                  setData({ ...data });
                }}
              />
            </div>
          );
        })}
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              editRow(data);
              history.goBack();
            }}
          >
            Submit
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}
          >
            Close
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
