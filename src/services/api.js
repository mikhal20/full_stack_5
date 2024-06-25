// services/api.js

// Fonction utilitaire pour effectuer des requêtes GET avec fetch
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
  // services/api.js

// Fonction pour récupérer tous les posts d'un utilisateur par userId
export async function getPostsByUserId(userId) {
    const url = `http://localhost:3001/posts?userId=${userId}`;
    return await fetchGet(url);
  }
  
  // Fonction pour mettre à jour un todo par son id
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
  // services/api.js

// Fonction pour récupérer tous les albums d'un utilisateur par userId
export async function getAlbumsByUserId(userId) {
    const url = `http://localhost:3001/albums?userId=${userId}`;
    return await fetchGet(url);
  }
  
  
  
  