import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Form, Profile } from 'Components/Share';
import Employees from 'Components/Employees';

const EmployeesRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/employees" component={Employees} />
        <Route exact path="/employees/:id" component={Profile} />
        <Route exact path="/employees/form/:id" render={() => <Form />} />
        <Redirect to={'/employees'} />
      </Switch>
    </Router>
  );
};

export default EmployeesRoutes;
