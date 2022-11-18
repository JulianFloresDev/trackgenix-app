import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SuperAdmins from 'Components/SuperAdmins';
import Form from 'Components/Share/Form';
import CreateForm from 'Components/Share/CreateForm';

const SuperAdminsRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/super-admins" component={SuperAdmins} />
        <Route path="/super-admins/form/:id" render={() => <Form />} />
        <Route path="/super-admins/new" render={() => <CreateForm />} />
      </Switch>
    </Router>
  );
};

export default SuperAdminsRoutes;
