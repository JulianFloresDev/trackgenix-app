import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SuperAdmins from 'Components/SuperAdmins';
import { Form } from 'Components/Share';

const SuperAdminsRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/super-admins" component={SuperAdmins} />
        <Route exact path="/super-admins/form/:id" render={() => <Form />} />
        <Redirect to={'/super-admins'} />
      </Switch>
    </Router>
  );
};

export default SuperAdminsRoutes;
