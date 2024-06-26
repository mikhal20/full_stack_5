import React, { useEffect, useState } from 'react';

const UserInfo = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Récupérer les détails de l'utilisateur depuis le localStorage
    const userData = localStorage.getItem('registrationDetails');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      
      <div>
        <strong>Name:</strong> {userDetails.name}
      </div>
      <div>
        <strong>Username:</strong> {userDetails.username}
      </div>
      <div>
        <strong>Email:</strong> {userDetails.email}
      </div>
      <div>
        <strong>Address:</strong>
        {userDetails.address ? (
          <div>
            <div>
              <strong>Street:</strong> {userDetails.address.street}
            </div>
            <div>
              <strong>Suite:</strong> {userDetails.address.suite}
            </div>
            <div>
              <strong>City:</strong> {userDetails.address.city}
            </div>
            <div>
              <strong>Zipcode:</strong> {userDetails.address.zipcode}
            </div>
            <div>
              <strong>Geo:</strong>
              {userDetails.address.geo ? (
                <div>
                  <div>
                    <strong>Lat:</strong> {userDetails.address.geo.lat}
                  </div>
                  <div>
                    <strong>Lng:</strong> {userDetails.address.geo.lng}
                  </div>
                </div>
              ) : (
                <div>Geo information not available</div>
              )}
            </div>
          </div>
        ) : (
          <div>Address information not available</div>
        )}
      </div>
      <div>
        <strong>Phone:</strong> {userDetails.phone}
      </div>
      <div>
        <strong>Website:</strong> {userDetails.website}
      </div>
      <div>
        <strong>Company:</strong>
        {userDetails.company ? (
          <div>
            <div>
              <strong>Name:</strong> {userDetails.company.name}
            </div>
            <div>
              <strong>Catch Phrase:</strong> {userDetails.company.catchPhrase}
            </div>
            <div>
              <strong>BS:</strong> {userDetails.company.bs}
            </div>
          </div>
        ) : (
          <div>Company information not available</div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;



