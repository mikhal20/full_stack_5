import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const Home = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleInfoClick = () => {
    // Rediriger vers la page d'information de l'utilisateur
    navigate('/info');
  };

  const handleTodosClick = () => {
    // Rediriger vers la page Todos
    navigate('/todos');
  };

  const handlePostsClick = () => {
    // Rediriger vers la page Posts
    navigate('/posts');
  };

  const handleAlbumsClick = () => {
    // Rediriger vers la page Albums
    navigate('/albums');
  };

  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome, {currentUser ? currentUser.name : 'Guest'}</h1>
        <div className="buttons-container">
          <button onClick={handleInfoClick}>Info</button>
          <button onClick={handleTodosClick}>Todos</button>
          <button onClick={handlePostsClick}>Posts</button>
          <button onClick={handleAlbumsClick}>Albums</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Home;


