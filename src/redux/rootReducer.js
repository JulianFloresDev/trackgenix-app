import { combineReducers } from 'redux';

import adminsReducer from './admins';
import employeesReducer from './employees';
import projectsReducer from './projects';
import superAdminsReducer from './superAdmins';
import tasksReducer from './tasks';
import timeSheetsReducer from './timeSheets';

const rootReducer = combineReducers({
  admins: adminsReducer,
  employees: employeesReducer,
  projects: projectsReducer,
  superAdmins: superAdminsReducer,
  tasks: tasksReducer,
  timeSheets: timeSheetsReducer
});

export default rootReducer;
