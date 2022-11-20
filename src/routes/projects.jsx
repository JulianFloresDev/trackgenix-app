import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Projects from 'Components/Projects';
import Form from 'Components/Share/Form';

const ProjectsRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/projects" component={Projects} />
        <Route path="/projects/form/:id" render={() => <Form />} />
      </Switch>
    </Router>
  );
};

export default ProjectsRoutes;
