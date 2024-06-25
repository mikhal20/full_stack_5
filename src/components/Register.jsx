import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordVerify) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/users?username=${username}`);
      const users = await response.json();

      if (users.length > 0) {
        setError('Username already exists');
        return;
      }

      const newUser = { username, website: password, name: username };
      await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      navigate('/login');
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={passwordVerify}
          onChange={(e) => setPasswordVerify(e.target.value)}
          placeholder="Verify Password"
          required
        />
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Register;


