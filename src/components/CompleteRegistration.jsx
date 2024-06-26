import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CompleteRegistration = () => {
  const { state } = useLocation();
  const { username, password } = state || {};
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [bs, setBs] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDetails = {
      username,
      website: password,
      email,
      address: {
        street,
        suite,
        city,
        zipcode,
        geo: {
          lat,
          lng
        }
      },
      phone,
      company: {
        name: companyName,
        catchPhrase,
        bs
      }
    };

    // Save user details to localStorage
    localStorage.setItem('registrationDetails', JSON.stringify(userDetails));

    // Save user details to the server
    await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    });

    navigate('/user-info');
  };

  return (
    <div className="complete-registration-container">
      <form onSubmit={handleSubmit}>
        <h2>Complete Registration</h2>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street" required />
        <input type="text" value={suite} onChange={(e) => setSuite(e.target.value)} placeholder="Suite" required />
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
        <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} placeholder="Zipcode" required />
        <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" required />
        <input type="text" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Longitude" required />
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" required />
        <input type="text" value={catchPhrase} onChange={(e) => setCatchPhrase(e.target.value)} placeholder="Catch Phrase" required />
        <input type="text" value={bs} onChange={(e) => setBs(e.target.value)} placeholder="BS" required />
        <button type="submit">Complete Registration</button>
      </form>
    </div>
  );
}

export default CompleteRegistration;



