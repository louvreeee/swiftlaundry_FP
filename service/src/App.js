
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nigga from './nigga'; // Assuming your component is in a file named "nigga.js"
import Sched from './sections/Sched';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import Home from './pages/Home';





function App() {
  const [user, setLoginUser] = useState({});
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nigga />} />
        <Route path="/" element={user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />} />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
        <Route path="/Sched" element={<Sched />} />
        <Route path="/" element={<Home />} />



        {/* Define more routes for other components as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
