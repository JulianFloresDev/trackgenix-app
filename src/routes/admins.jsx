import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admins from 'Components/Admins';
import Form from 'Components/Share/Form';
import CreateForm from 'Components/Share/CreateForm';

const AdminsRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/admins" component={Admins} />
        <Route path="/admins/form/:id" render={() => <Form />} />
        <Route path="/admins/new" render={() => <CreateForm />} />
      </Switch>
    </Router>
  );
};

export default AdminsRoutes;
