import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;