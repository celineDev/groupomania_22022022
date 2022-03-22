import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Profile from './pages/Profile';
import { UserContext } from './UserContext';

const App = () => {
  const [uid, setUid] = useState(null)

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    console.log('loggedInUser')
    console.log(loggedInUser) // userid et token
    console.log(loggedInUser) // userid et token
    setUid(loggedInUser);
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={uid}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;