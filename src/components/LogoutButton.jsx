import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} style={{ position: 'absolute', top: 10, right: 10 }}>
      Logout
    </button>
  );
};

export default LogoutButton;
