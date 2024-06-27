// services/api.js

// services/api.js


async function fetchGet(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Fonction pour récupérer tous les todos d'un utilisateur par userId
export async function getTodosByUserId(userId) {
  const url = `http://localhost:3001/todos?userId=${userId}`;
  return await fetchGet(url);
}

// Fonction pour ajouter un nouveau todo
export async function addTodo(todo) {
  const url = 'http://localhost:3001/todos';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
}

// Fonction pour supprimer un todo par son id
export async function deleteTodo(todoId) {
  const url = `http://localhost:3001/todos/${todoId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}
export async function updateTodo(todoId, updatedFields) {
  const url = `http://localhost:3001/todos/${todoId}`;
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedFields)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}

/*albums fonctions*/
// Function to fetch albums by user ID
export async function getAlbumsByUserId(userId) {
  const url = `http://localhost:3001/albums?userId=${userId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
}

// Function to fetch photos by album ID
export async function getPhotosByAlbumId(albumId) {
  const url = `http://localhost:3001/photos?albumId=${albumId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching photos for album ${albumId}:`, error);
    throw error;
  }
}

// Function to add a new album
export async function addAlbum(newAlbum) {
  const url = `http://localhost:3001/albums`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAlbum),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding album:', error);
    throw error;
  }
}

// Function to delete an album by ID
export async function deleteAlbum(albumId) {
  const url = `http://localhost:3001/albums/${albumId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Assuming your API returns the deleted album
  } catch (error) {
    console.error('Error deleting album:', error);
    throw error;
  }
}
export async function updateAlbum(albumId, updatedFields) {
  const url = `http://localhost:3001/albums/${albumId}`;
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Assuming your API returns the updated album
  } catch (error) {
    console.error('Error updating album:', error);
    throw error;
  }
}

// Function to delete a photo from an album
export async function deletePhotoFromAlbum(albumId, photoId) {
  const url = `http://localhost:3001/photos/${photoId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Assuming your API returns the deleted photo
  } catch (error) {
    console.error('Error deleting photo from album:', error);
    throw error;
  }
}

export async function updatePhotoInAlbum(albumId, photoId, updatedData) {
  const url = `http://localhost:3001/photos/${photoId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updatedData, albumId }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Assuming your API returns the updated photo
  } catch (error) {
    console.error('Error updating photo in album:', error);
    throw error;
  }
}

export async function addPhotoToAlbum(albumId, photoData) {
  const url = `http://localhost:3001/photos`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photoData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Assuming your API returns the new photo
  } catch (error) {
    console.error('Error adding photo to album:', error);
    throw error;
  }
}
/*posts fonctions*/

  export async function getPostsByUserWithPosts(userId) {
    const url = `http://localhost:3001/posts?userId=${userId}`;
    return await fetchGet(url);
    }
    export const createComment = (commentData) => {
      // Implémentez la logique pour créer un commentaire
      return fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      }).then(response => response.json());
    };

const apiUrl = 'http://localhost:3001';

export const getPostsByUserId = async (userId) => {
  const response = await fetch(`${apiUrl}/posts?userId=${userId}`);
  return await response.json();
};

export const getCommentsByPostId = async (postId) => {
  const response = await fetch(`${apiUrl}/comments?postId=${postId}`);
  return await response.json();
};

export const addPost = async (post) => {
  const response = await fetch(`${apiUrl}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return await response.json();
};

export const deletePost = async (postId) => {
  const response = await fetch(`${apiUrl}/posts/${postId}`, {
    method: 'DELETE',
  });
  return response.ok;
};

export const updatePost = async (postId, post) => {
  const response = await fetch(`${apiUrl}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return await response.json();
};

export const addCommentToPost = async (postId, comment) => {
  const response = await fetch(`${apiUrl}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...comment, postId }),
  });
  return await response.json();
};

export const deleteComment = async (commentId) => {
  const response = await fetch(`${apiUrl}/comments/${commentId}`, {
    method: 'DELETE',
  });
  return response.ok;
};

export const updateComment = async (commentId, comment) => {
  const response = await fetch(`${apiUrl}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  return await response.json();
};




