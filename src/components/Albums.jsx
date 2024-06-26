import React, { useEffect, useState } from 'react';
import {
  getAlbumsByUserId,
  getPhotosByAlbumId,
  addAlbum,
  deleteAlbum,
  updateAlbum,
  addPhotoToAlbum,
  deletePhotoFromAlbum,
  updatePhotoInAlbum
} from '../services/api';
import './style.css';

function Albums({ currentUser }) {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [error, setError] = useState('');
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (currentUser) {
      fetchAlbums();
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedAlbumId) {
      fetchPhotos(selectedAlbumId);
    }
  }, [selectedAlbumId]);

  const fetchAlbums = async () => {
    try {
      const data = await getAlbumsByUserId(currentUser.id);
      setAlbums(data);
      setFilteredAlbums(data);
    } catch (error) {
      console.error('Error fetching albums:', error);
      setError('Error fetching albums');
    }
  };

  const fetchPhotos = async (albumId) => {
    try {
      setLoadingPhotos(true);
      const data = await getPhotosByAlbumId(albumId);
      setPhotos(data);
      setLoadingPhotos(false);
    } catch (error) {
      console.error(`Error fetching photos for album ${albumId}:`, error);
      setError('Error fetching photos');
      setLoadingPhotos(false);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchCriteria(value.toLowerCase());
    const filtered = albums.filter(album =>
      album.id.toString().includes(value) ||
      album.title.toLowerCase().includes(value)
    );
    setFilteredAlbums(filtered);
  };

  const handleAlbumClick = (albumId) => {
    setSelectedAlbumId(albumId);
    setSelectedPhotoId(null); // Clear photo selection
  };

  const handleAddAlbum = async () => {
    try {
      const newAlbum = { userId: currentUser.id, title: 'New Album' };
      const response = await addAlbum(newAlbum);
      setAlbums([...albums, response]);
      setFilteredAlbums([...albums, response]);
    } catch (error) {
      console.error('Error adding album:', error);
      setError('Error adding album');
    }
  };

  const handleDeleteAlbum = async (albumId) => {
    try {
      await deleteAlbum(albumId);
      const updatedAlbums = albums.filter(album => album.id !== albumId);
      setAlbums(updatedAlbums);
      setFilteredAlbums(updatedAlbums);
      setSelectedAlbumId(null); // Clear photos when deleting an album
    } catch (error) {
      console.error('Error deleting album:', error);
      setError('Error deleting album');
    }
  };

  const handleAddPhotoToAlbum = async (albumId, photoData) => {
    try {
      const newPhoto = await addPhotoToAlbum(albumId, photoData);
      setPhotos([...photos, newPhoto]); // Update the state with the new photo
    } catch (error) {
      console.error('Error adding photo to album:', error);
      setError('Error adding photo to album');
    }
  };

  const handleDeletePhotoFromAlbum = async (albumId, photoId) => {
    try {
      await deletePhotoFromAlbum(albumId, photoId);
      setPhotos(photos.filter(photo => photo.id !== photoId)); // Update the state after deleting a photo
    } catch (error) {
      console.error('Error deleting photo from album:', error);
      setError('Error deleting photo from album');
    }
  };

  const handleUpdatePhotoInAlbum = async () => {
    try {
      const updatedData = { title: photoTitle, url: photoUrl };
      const updatedPhoto = await updatePhotoInAlbum(selectedAlbumId, selectedPhotoId, updatedData);
      setPhotos(photos.map(photo => (photo.id === selectedPhotoId ? updatedPhoto : photo))); // Update the state with the updated photo
      setSelectedPhotoId(null); // Clear photo selection
      setPhotoTitle(''); // Clear input field
      setPhotoUrl(''); // Clear URL field
    } catch (error) {
      console.error('Error updating photo in album:', error);
      setError('Error updating photo in album');
    }
  };

  const handlePhotoClick = (photoId, title, url) => {
    setSelectedPhotoId(photoId);
    setPhotoTitle(title);
    setPhotoUrl(url);
  };

  const handleAddNewPhoto = async (albumId) => {
    try {
      const newPhoto = { albumId, title: photoTitle, url: photoUrl };
      const addedPhoto = await addPhotoToAlbum(albumId, newPhoto);
      setPhotos([...photos, addedPhoto]); // Update the state with the new photo
      setPhotoTitle(''); // Clear input field
      setPhotoUrl(''); // Clear URL field
    } catch (error) {
      console.error('Error adding new photo:', error);
      setError('Error adding new photo');
    }
  };

  return (
    <div>
      <h2>Albums</h2>
      <div className="album-controls">
        <input
          type="text"
          placeholder="Search albums..."
          value={searchCriteria}
          onChange={handleSearch}
        />
        <button onClick={handleAddAlbum}>Add Album</button>
      </div>
      <ul className="album-list">
        {filteredAlbums.map(album => (
          <li key={album.id}>
            <a href="#" onClick={() => handleAlbumClick(album.id)}>
              {album.id}. {album.title}
            </a>
          </li>
        ))}
      </ul>
      {selectedAlbumId && (
        <div className="album-photos">
          <h3>Photos of Album {selectedAlbumId}</h3>
          {loadingPhotos ? (
            <p>Loading photos...</p>
          ) : (
            <ul className="photo-list">
              {photos.map(photo => (
                <li key={photo.id}>
                  <img src={photo.thumbnailUrl} alt={photo.title} onClick={() => handlePhotoClick(photo.id, photo.title, photo.url)} />
                  <button onClick={() => handleDeletePhotoFromAlbum(selectedAlbumId, photo.id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
          {selectedPhotoId && (
            <div className="update-photo">
              <input
                type="text"
                placeholder="Update photo title"
                value={photoTitle}
                onChange={(e) => setPhotoTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Update photo URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
              <button onClick={handleUpdatePhotoInAlbum}>Update Photo</button>
            </div>
          )}
          <div className="add-photo">
            <input
              type="text"
              placeholder="New photo title"
              value={photoTitle}
              onChange={(e) => setPhotoTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="New photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <button onClick={() => handleAddNewPhoto(selectedAlbumId)}>Add Photo</button>
          </div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Albums;






