import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import UserInfo from './components/UserInfo';
import Todos from './components/Todos';
import Posts from './components/Posts';
import Albums from './components/Albums';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={currentUser ? <Home currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />} />
      <Route path="/userinfo" element={currentUser ? <UserInfo currentUser={currentUser} /> : <Navigate to="/login" />} />
      <Route path="/todos" element={currentUser ? <Todos currentUser={currentUser} /> : <Navigate to="/login" />} />
      <Route path="/posts" element={currentUser ? <Posts currentUser={currentUser} /> : <Navigate to="/login" />} />
      <Route path="/albums" element={currentUser ? <Albums currentUser={currentUser} /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;







