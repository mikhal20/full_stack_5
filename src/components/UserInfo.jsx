import React from 'react';

const UserInfo = ({ currentUser }) => {
  return (
    <div className="info-container">
      {currentUser ? (
        <div>
          <h2>User Information</h2>
          <p>Name: {currentUser.name}</p>
          <p>Username: {currentUser.username}</p>
        </div>
      ) : (
        <p>Please log in to see your information.</p>
      )}
    </div>
  );
}

export default UserInfo;


