import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;