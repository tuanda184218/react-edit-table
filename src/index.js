import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Layout from './Layout';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');
render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>,
  root
);

reportWebVitals();
