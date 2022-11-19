import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Employees from 'Components/Employees';
import Form from 'Components/Share/Form';

const EmployeesRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/employees" component={Employees} />
        <Route path="/employees/form/:id" render={() => <Form />} />
      </Switch>
    </Router>
  );
};

export default EmployeesRoutes;
