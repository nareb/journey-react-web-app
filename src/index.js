import React from 'react';
import ReactDOM from 'react-dom';
import store from './Journey/store';
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
