import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {  Routes, Route, HashRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthProvider';
import { EmployeeContextProvider } from './context/EmployeeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
        <Routes history={hashHistory}>
          <Route exact path="*" element={<EmployeeContextProvider><AuthContextProvider><App /></AuthContextProvider></EmployeeContextProvider>}>
          </Route>    
        </Routes>
      </HashRouter>
  </React.StrictMode>  
);

