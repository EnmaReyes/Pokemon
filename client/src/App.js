import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import {Landing, Detail, Home, Form} from './views';
import React from 'react';

function App() {
  

  const location = useLocation();

  return (
    <div className="App">
      <Routes>

      <Route path="/" element={<Landing /> } />

      <Route path="/home" element={<Home/>} />

      <Route path ="/pokemon/:id" element={<Detail/>}  /> 

      <Route path ="/create" element={ <Form/> } /> 
      
      </Routes>
    </div>
  );
}



export default App;
