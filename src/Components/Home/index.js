import styles from './home.module.css';
import inputStyles from '../Share/InputForm/inputForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../../redux/employees/thunks';
import { getTasks } from '../../redux/tasks/thunks';
import { getProjects } from '../../redux/projects/thunks';
import { editItem } from 'redux/global/actions';
import { useEffect } from 'react';
import { InputForm } from '../Share/InputForm';
import { SelectForm } from 'Components/Share/SelectForm';

function Home() {
  const dispatch = useDispatch();
  const { list: projectList } = useSelector((state) => state.projects);
  const { list: employeeList } = useSelector((state) => state.employees);
  const { list: tasksList } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(getEmployees(''));
    dispatch(getTasks(''));
    dispatch(getProjects(''));
    dispatch(editItem(MOCKED_DATA));
  }, []);

  const MOCKED_DATA = {
    _id: '63531fd7410c845909ab22e7',
    date: '2022-10-20T00:00:00.000+00:00',
    task: null,
    description: 'Backend',
    project: {
      _id: '6367ca5aff827284b01c7ede',
      name: 'Project Title',
      description: 'This is a description',
      startDate: '11-10-2021',
      endDate: '07-10-2022',
      active: true,
      clientName: 'Martins',
      teamMembers: [
        {
          employee: {
            _id: '636ab5cba462c574dd24a868',
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
      _id: '636ab5cba462c574dd24a868',
      firstName: 'Peter',
      lastName: 'Hills',
      email: 'peterhills@gmail.com',
      password: 'Axhvbhd7844',
      dni: '30457895',
      phone: '1168542485',
      location: 'Montana'
    },
    hours: 8,
    active: true,
    role: null
  };

  // const MOCKED_DATA = {
  //   _id: '63531244ec6456efd12685ef',
  //   firstName: 'Peter',
  //   lastName: 'Hills',
  //   email: 'peterhills@gmail.com',
  //   password: 'Axhvbhd7844',
  //   dni: '30457895',
  //   phone: '1168542485',
  //   location: 'Montana'
  // };

  return (
    <section className={styles.container}>
      <h2>Home</h2>
      <form className={inputStyles.form}>
        {Object.keys(MOCKED_DATA).map((prop) => {
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
            case 'rate':
              return <InputForm element={prop} label={'Rate'} inputType={'number'} />;
            case 'hours':
              return <InputForm element={prop} label={'Hours'} inputType={'number'} />;
            case 'phone':
              return <InputForm element={prop} label={'Phone'} inputType={'phone'} />;
            case 'date':
              return <InputForm element={prop} label={'Date'} inputType={'date'} />;
            case 'updatedAt':
              return <InputForm element={prop} label={'Date'} inputType={'date'} />;
            case 'createdAt':
              return <InputForm element={prop} label={'Date'} inputType={'date'} />;
            case 'location':
              return <InputForm element={prop} label={'Address'} inputType={'text'} />;
            case 'description':
              return (
                <InputForm
                  element={prop}
                  label={'Description'}
                  inputType={'text'}
                  error={['One error first', 'Other error more']}
                />
              );
            case 'active':
              return <InputForm element={prop} label={'Project State'} inputType={'checkbox'} />;
            case 'role':
              return (
                <SelectForm
                  element={prop}
                  label={'Role'}
                  selectOptions={[
                    { description: 'DEV' },
                    { description: 'QA' },
                    { description: 'TL' },
                    { description: 'PM' }
                  ]}
                  error={'Some error to test styles'}
                />
              );
            case 'project':
              return <SelectForm element={prop} label={'Projects'} selectOptions={projectList} />;
            case 'task':
              return <SelectForm element={prop} label={'Tasks'} selectOptions={tasksList} />;
            case 'employee':
              return (
                <SelectForm element={prop} label={'Team Members'} selectOptions={employeeList} />
              );
            default:
              return null;
          }
        })}
      </form>
    </section>
  );
}

export default Home;
