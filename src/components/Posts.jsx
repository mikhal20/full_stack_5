import React, { useState, useEffect } from 'react';
import {
  getPostsByUserId,
  getCommentsByPostId,
  addPost,
  deletePost,
  updatePost,
  addCommentToPost,
  deleteComment,
  updateComment
} from '../services/api';

function Posts({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComments, setSelectedComments] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostBody, setEditPostBody] = useState('');
  const [editCommentBody, setEditCommentBody] = useState('');
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      getPostsByUserId(currentUser.id)
        .then(data => {
          setPosts(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
          setLoading(false);
        });
    }
  }, [currentUser]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = posts.filter((post, index) => {
    const titleMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const positionMatch = (index + 1).toString().includes(searchQuery);
    return titleMatch || positionMatch;
  });

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setSelectedComments([]);
    setSelectedComment(null); // Reset selected comment when selecting a new post
  };

  const handleCommentsClick = (post) => {
    getCommentsByPostId(post.id)
      .then(data => setSelectedComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  };

  const handleAddPost = async () => {
    try {
      const newPost = { userId: currentUser.id, title: newPostTitle, body: newPostBody };
      const addedPost = await addPost(newPost);
      setPosts([...posts, addedPost]);
      setNewPostTitle('');
      setNewPostBody('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
      setSelectedPost(null);
      setSelectedComments([]);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdatePost = async () => {
    try {
      const updatedPost = { ...selectedPost, title: editPostTitle, body: editPostBody };
      const response = await updatePost(selectedPost.id, updatedPost);
      setPosts(posts.map(post => (post.id === selectedPost.id ? response : post)));
      setSelectedPost(null);
      setEditPostTitle('');
      setEditPostBody('');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleUpdateComment = async (comment) => {
    try {
      const updatedComment = { ...comment, body: editCommentBody };
      const response = await updateComment(comment.id, updatedComment);
      setSelectedComments(selectedComments.map(c => (c.id === comment.id ? response : c)));
      setEditCommentBody('');
      setSelectedComment(null);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleEditPost = (post) => {
    setEditPostTitle(post.title);
    setEditPostBody(post.body);
    setSelectedPost(post);
  };

  const handleEditComment = (comment) => {
    setEditCommentBody(comment.body);
    setSelectedComment(comment);
  };

  return (
    <div>
      <h2>Posts</h2>
      <input
        type="search"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by title or position"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ol>
          {filteredPosts.map(post => (
            <li key={post.id}>
              <h3 onClick={() => handlePostClick(post)}>{post.title}</h3>
              {selectedPost && selectedPost.id === post.id && (
                <>
                  <p>{post.body}</p>
                  <div>
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                    <button onClick={() => handleEditPost(post)}>Edit Post</button>
                    {selectedComment === null && (
                      <button onClick={() => handleCommentsClick(post)}>Comments</button>
                    )}
                  </div>
                  {selectedComment === null && (
                    <div>
                      <input
                        type="text"
                        placeholder="Edit title"
                        value={editPostTitle}
                        onChange={(e) => setEditPostTitle(e.target.value)}
                      />
                      <textarea
                        placeholder="Edit body"
                        value={editPostBody}
                        onChange={(e) => setEditPostBody(e.target.value)}
                      ></textarea>
                      <button onClick={handleUpdatePost}>Update Post</button>
                    </div>
                  )}
                  {selectedComments.length > 0 && selectedPost && selectedPost.id === post.id && (
                    <ul>
                      {selectedComments.map(comment => (
                        <li key={comment.id}>
                          <p>{comment.name}</p>
                          <p>{comment.body}</p>
                          <button onClick={() => handleEditComment(comment)}>Edit Comment</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
          {filteredPosts.length === 0 && (
            <p>No posts found</p>
          )}
        </ol>
      )}
      <div>
        <h3>Add New Post</h3>
        <input
          type="text"
          placeholder="Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={newPostBody}
          onChange={(e) => setNewPostBody(e.target.value)}
        ></textarea>
        <button onClick={handleAddPost}>Add Post</button>
      </div>
      {selectedComment && (
        <div>
          <textarea
            placeholder="Edit comment body"
            value={editCommentBody}
            onChange={(e) => setEditCommentBody(e.target.value)}
          ></textarea>
          <button onClick={() => handleUpdateComment(selectedComment)}>Update Comment</button>
        </div>
      )}
    </div>
  );
}

export default Posts;



