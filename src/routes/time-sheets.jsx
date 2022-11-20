import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TimeSheets from 'Components/TimeSheets';
import { Form } from 'Components/Share';

const TimeSheetsRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/time-sheets" component={TimeSheets} />
        <Route path="/time-sheets/form/:id" render={() => <Form />} />
      </Switch>
    </Router>
  );
};

export default TimeSheetsRoutes;
