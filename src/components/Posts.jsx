// components/Posts.jsx

import React, { useEffect, useState } from 'react';
import { getPostsByUserId } from '../services/api';

function Posts({ currentUser }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (currentUser) {
      getPostsByUserId(currentUser.id)
        .then(data => setPosts(data))
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [currentUser]);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;

