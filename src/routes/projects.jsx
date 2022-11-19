import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Projects from 'Components/Projects';
// import Form from 'Components/Share/Form';
import CreateForm from 'Components/Share/CreateForm';

const ProjectsRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/projects" component={Projects} />
        <Route path="/projects/form/:id" render={() => <CreateForm />} />
        <Route path="/projects/new" render={() => <CreateForm />} />
      </Switch>
    </Router>
  );
};

export default ProjectsRoutes;
