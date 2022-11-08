import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateForm = () => {
  const [data, setData] = useState({});

  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const entitie = URLPath[1];

  const hardcodeProps = () => {
    switch (entitie) {
      case 'admins':
      case 'super-admins':
      case 'employees':
        return ['firstName', 'lastName', 'email', 'password', 'dni', 'phone', 'location'];
      case 'projects':
        return [
          'name',
          'description',
          'startDate',
          'endDate',
          'active',
          'clientName',
          'teamMembers'
        ];
      case 'time-sheets':
        return ['description', 'date', 'task', 'project', 'employee', 'hours'];
      case 'tasks':
        return ['description'];
    }
  };

  useEffect(async () => {
    /*
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${entitie}`);
    const responseJson = await response.json();
    */
  }, []);

  const createRow = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/${entitie}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/Json'
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error(error);
    }
  };

  const properties = hardcodeProps();

  return (
    <section>
      <form>
        {properties.map((prop, index) => {
          return (
            <div key={index}>
              <label htmlFor={prop}>{prop}</label>
              <input
                id={prop}
                type="text"
                onChange={(e) => {
                  data[prop] = e.target.value;
                  setData({ ...data });
                  console.log('Data:', data);
                }}
              />
            </div>
          );
        })}
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              createRow();
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

export default CreateForm;
