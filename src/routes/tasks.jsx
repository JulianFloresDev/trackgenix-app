import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Tasks from 'Components/Tasks';
import { Form } from 'Components/Share';

const TasksRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/tasks" component={Tasks} />
        <Route path="/tasks/form/:id" render={() => <Form />} />
        <Redirect to={'/tasks'} />
      </Switch>
    </Router>
  );
};

export default TasksRoutes;
