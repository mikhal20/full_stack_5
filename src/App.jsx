import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import UserInfo from './components/UserInfo';
import Todos from './components/Todos';
import Posts from './components/Posts';
import Albums from './components/Albums';
import CompleteRegistration from './components/CompleteRegistration';
import LogoutButton from './components/LogoutButton';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      {currentUser && <LogoutButton setCurrentUser={setCurrentUser} />}
      <Routes>
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
        <Route path="/home" element={currentUser ? <Home currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />} />
        <Route path="/userinfo" element={currentUser ? <UserInfo currentUser={currentUser} /> : <Navigate to="/userinfo" />} />
        <Route path="/todos" element={currentUser ? <Todos currentUser={currentUser} /> : <Navigate to="/todos" />} />
        <Route path="/posts" element={currentUser ? <Posts currentUser={currentUser} /> : <Navigate to="/posts" />} />
        <Route path="/albums" element={currentUser ? <Albums currentUser={currentUser} /> : <Navigate to="/albums" />} />
        <Route path="/complete-registration" element={currentUser ? <CompleteRegistration currentUser={currentUser} /> : <Navigate to="/complete-registration" />} />
        <Route path="/user-info" element={currentUser ? <UserInfo currentUser={currentUser} /> : <Navigate to="/user-info" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;








