import { combineReducers } from 'redux';

import adminsReducer from './admins/reducer';
import employeesReducer from './employees/reducer';
import globalReducer from './global/reducer';
import projectsReducer from './projects/reducer';
import superAdminsReducer from './super-admins/reducer';
import tasksReducer from './tasks/reducer';
import timeSheetsReducer from './time-sheets/reducer';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  employees: employeesReducer,
  projects: projectsReducer,
  superAdmins: superAdminsReducer,
  tasks: tasksReducer,
  timeSheets: timeSheetsReducer,
  global: globalReducer,
  auth: authReducer
});

export default rootReducer;
