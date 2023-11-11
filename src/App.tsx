import React from 'react';
import { Routes, Route } from "react-router-dom";
import Admin from './views/Admin';
import GroupTasks from './views/GroupTasks';
import MyTasks from './views/MyTasks';
import Metrics from './views/Metrics';
import Navigation from './routes/navigation/navigation.component';

import './App.css';

function App() {
  return (
    <div className='app'>
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<MyTasks />}></Route>
        <Route path="/GroupTasks" element={<GroupTasks />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route path="/Metrics" element={<Metrics />}></Route>
      </Route>
    </Routes>
  </div>
  );
}

export default App;
