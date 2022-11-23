import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Employees from 'Components/Employees';
import { Form } from 'Components/Share';

const EmployeesRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/employees" component={Employees} />
        <Route path="/employees/form/:id" render={() => <Form />} />
        <Redirect to={'/employees'} />
      </Switch>
    </Router>
  );
};

export default EmployeesRoutes;
