import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Layout from './routes/index';
import store from './redux/store';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Layout />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
