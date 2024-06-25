// components/Albums.jsx

import React, { useEffect, useState } from 'react';
import { getAlbumsByUserId } from '../services/api';

function Albums({ currentUser }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (currentUser) {
      getAlbumsByUserId(currentUser.id)
        .then(data => setAlbums(data))
        .catch(error => console.error('Error fetching albums:', error));
    }
  }, [currentUser]);

  return (
    <div>
      <h2>Albums</h2>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            {album.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Albums;

