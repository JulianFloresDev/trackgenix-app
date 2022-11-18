import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Employees from 'Components/Employees';
import Form from 'Components/Share/Form';
import CreateForm from 'Components/Share/CreateForm';

const EmployeesRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/employees" component={Employees} />
        <Route path="/employees/form/:id" render={() => <Form />} />
        <Route path="/employees/new" render={() => <CreateForm />} />
      </Switch>
    </Router>
  );
};

export default EmployeesRoutes;
