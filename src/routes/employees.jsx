import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Employees from 'Components/Employees';
import Profile from 'Components/Share/Profile';
import { Form } from 'Components/Share';

const EmployeesRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/employees" component={Employees} />
        <Route exact path="/employees/:id" component={Profile} />
        <Route path="/employees/form/:id" render={() => <Form />} />
      </Switch>
    </Router>
  );
};

export default EmployeesRoutes;
