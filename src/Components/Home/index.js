import styles from './home.module.css';
import inputStyles from '../Share/InputForm/inputForm.module.css';
import { InputForm } from '../Share/InputForm';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../../redux/employees/thunks';
import { getTasks } from '../../redux/tasks/thunks';
import { getProjects } from '../../redux/projects/thunks';
import { useEffect } from 'react';

function Home() {
  const dispatch = useDispatch();
  const { list: projectList } = useSelector((state) => state.projects);
  const { list: employeeList } = useSelector((state) => state.employees);
  const { list: tasksList } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(getEmployees(''));
    dispatch(getTasks(''));
    dispatch(getProjects(''));
  }, []);
  const MOCKED_USER = {
    _id: '63531fd7410c845909ab22e7',
    date: '2022-10-20T00:00:00.000+00:00',
    task: { _id: '63531a7c73636855c2aa7f9a', description: 'Backend' },
    description: 'Backend',
    project: {
      _id: '63531aaa2b654a3fb77054dd',
      name: 'Project Title',
      description: 'This is a description',
      startDate: '11-10-2021',
      endDate: '07-10-2022',
      active: true,
      clientName: 'Martins',
      teamMembers: [
        {
          employee: {
            _id: '63531244ec6456efd12685ef',
            firstName: 'Peter',
            lastName: 'Hills',
            email: 'peterhills@gmail.com',
            password: 'Axhvbhd7844',
            dni: '30457895',
            phone: '1168542485',
            location: 'Montana'
          },
          role: 'DEV',
          rate: 100
        }
      ]
    },
    employee: {
      _id: '63531244ec6456efd12685ef',
      firstName: 'Peter',
      lastName: 'Hills',
      email: 'peterhills@gmail.com',
      password: 'Axhvbhd7844',
      dni: '30457895',
      phone: '1168542485',
      location: 'Montana'
    },
    hours: 8
  };
  return (
    <section className={styles.container}>
      <h2>Home</h2>
      <form className={inputStyles.form}>
        {Object.keys(MOCKED_USER).map((prop) => {
          switch (prop) {
            case 'firstName':
              return <InputForm element={prop} label={'First Name'} inputType={'text'} />;
            case 'lastName':
              return <InputForm element={prop} label={'Last Name'} inputType={'text'} />;
            case 'email':
              return <InputForm element={prop} label={'Email'} inputType={'email'} />;
            case 'password':
              return <InputForm element={prop} label={'Password'} inputType={'password'} />;
            case 'dni':
              return <InputForm element={prop} label={'D.N.I.'} inputType={'number'} />;
            case 'hours':
              return <InputForm element={prop} label={'Hours'} inputType={'number'} />;
            case 'phone':
              return <InputForm element={prop} label={'Phone'} inputType={'phone'} />;
            case 'date':
              return <InputForm element={prop} label={'Date'} inputType={'date'} />;
            case 'location':
              return <InputForm element={prop} label={'Address'} inputType={'text'} />;
            case 'description':
              return <InputForm element={prop} label={'Description'} inputType={'text'} />;
            case 'project':
              return <InputForm element={prop} label={'Projects'} selectOptions={projectList} />;
            case 'task':
              return <InputForm element={prop} label={'Tasks'} selectOptions={tasksList} />;
            case 'employee':
              return (
                <InputForm element={prop} label={'Team Members'} selectOptions={employeeList} />
              );
          }
        })}
      </form>
    </section>
  );
}

export default Home;
