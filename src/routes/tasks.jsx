import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Tasks from 'Components/Tasks';
import Form from 'Components/Share/Form';

const TasksRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/tasks" component={Tasks} />
        <Route path="/tasks/form/:id" render={() => <Form />} />
      </Switch>
    </Router>
  );
};

export default TasksRoutes;
