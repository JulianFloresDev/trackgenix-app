import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateForm = () => {
  const [data, setData] = useState({});

  const history = useHistory();
  const URLPath = history.location.pathname.split('/');
  const entitie = URLPath[1];

  useEffect(async () => {
    switch (entitie) {
      case 'admins':
      case 'super-admins':
      case 'employees':
        setData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          dni: '',
          phone: '',
          location: ''
        });
        break;
      case 'projects':
        setData({
          name: '',
          description: '',
          startDate: '',
          endDate: '',
          active: '',
          clientName: '',
          teamMembers: []
        });
        break;
      case 'time-sheets':
        setData({
          description: '',
          date: '',
          task: '',
          project: '',
          employee: '',
          hour: ''
        });
        break;
      case 'tasks':
        setData({ description: '' });
    }
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

  return (
    <section>
      <form>
        {Object.keys(data).map((prop, index) => {
          let typeOfInput = 'text';
          if (prop.match('date') || prop.match('endDate') || prop.match('startDate')) {
            typeOfInput = 'date';
            data[prop] = data[prop].substring(0, 10);
          }
          prop.includes('hours') && (typeOfInput = 'number');
          return (
            <div key={index}>
              <label htmlFor={prop}>{prop}</label>
              <input
                id={prop}
                type={typeOfInput}
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
              createRow();
              history.goBack();
            }}
          >
            Create
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
