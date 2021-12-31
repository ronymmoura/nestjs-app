import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import reportWebVitals from './reportWebVitals';

import { AppRoutes } from '@routes';
import defaultTheme from '@styles/defaultTheme';
import { ApiProvider } from './contexts/api';

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider baseUrl="http://localhost:9090">
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
