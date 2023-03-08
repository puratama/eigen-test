import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/home';
import Detail from './pages/detail';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <h1 className="text-center my-30px">EIGEN NEWS</h1>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/news-detail/:getId' element={<Detail/>} />
    </Routes>
  </BrowserRouter>
);