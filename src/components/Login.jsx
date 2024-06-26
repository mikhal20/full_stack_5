import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';




const Login = ({ setCurrentUser }) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
try {
const response = await fetch(`http://localhost:3001/users?username=${username}`);
const users = await response.json();
const user = users[0];

if (user && user.website === password) {
setCurrentUser(user);
localStorage.setItem('currentUser', JSON.stringify(user));
navigate('/home');
} else {
setError('Invalid username or password');
}
} catch (err) {
setError('An error occurred');
}
};

return (
<div className="login-container">
<h1>Login</h1>
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
<button type="submit" className="btn-primary">Login</button>
{error && <p className="error">{error}</p>}
</form>
<p>Don't have an account? <Link to="/register">Create one here</Link></p>
</div>
);
}

export default Login;
