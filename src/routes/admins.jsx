import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Admins from 'Components/Admins';
import { Form, Profile } from 'Components/Share';

const AdminsRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/admins" component={Admins} />
        <Route exact path="/admins/:id" component={Profile} />
        <Route exact path="/admins/form/:id" render={() => <Form />} />
        <Redirect to={'/admins'} />
      </Switch>
    </Router>
  );
};

export default AdminsRoutes;
