import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './view/Home';
import CourseTable from './view/CourseTable';
import Profile from './view/Profile';
import NavBar from './compoents/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className='app-body'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courseTable" element={<CourseTable />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );

}

export default App;
