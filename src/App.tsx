import React from 'react';
import { Routes, Route } from "react-router-dom";
import Admin from './views/Admin';
import AssignTasks from './views/AssignTasks';
import MyTasks from './views/MyTasks';
import Metrics from './views/Metrics';
import Navigation from './routes/navigation/navigation.component';
import TAOViews from './views/TAOViews';

import './App.css';

function App() {
  return (
    <div className='app'>
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<MyTasks />}></Route>
        <Route path="/AssignTasks" element={<AssignTasks />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route path="/TAOViews" element={<TAOViews />}></Route>
        <Route path="/Metrics" element={<Metrics />}></Route>
      </Route>
    </Routes>
  </div>
  );
}

export default App;
