import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'Components/Home';
import { Form } from 'Components/Share';

const HomeRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/time-sheets/form/:id" render={() => <Form />} />
      </Switch>
    </Router>
  );
};

export default HomeRoutes;
