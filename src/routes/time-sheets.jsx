import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import TimeSheets from 'Components/TimeSheets';
import { Form } from 'Components/Share';

const TimeSheetsRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/time-sheets" component={TimeSheets} />
        <Route exact path="/time-sheets/form/:id" render={() => <Form />} />
        <Redirect to={'/time-sheets'} />
      </Switch>
    </Router>
  );
};

export default TimeSheetsRoutes;
