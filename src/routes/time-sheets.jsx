import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TimeSheets from 'Components/TimeSheets';
import Form from 'Components/Share/Form';
import CreateForm from 'Components/Share/CreateForm';

const TimeSheetsRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/time-sheets" component={TimeSheets} />
        <Route path="/time-sheets/form/:id" render={() => <Form />} />
        <Route path="/time-sheets/new" render={() => <CreateForm />} />
      </Switch>
    </Router>
  );
};

export default TimeSheetsRoutes;
