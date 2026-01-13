import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/PostPage.css';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(response.data);
      
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser && response.data.author._id === currentUser.id) {
        setIsAuthor(true);
      }
      setLoading(false);
    } catch (err) {
      setError('Post not found');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) {
    return <div className="post-page-container"><p>Loading...</p></div>;
  }

  if (error || !post) {
    return (
      <div className="post-page-container">
        <div className="error-card">
          <p>{error || 'Post not found'}</p>
          <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="post-page-container">
      <div className="post-page-card">
        <h1>{post.title}</h1>
        
        <div className="post-meta">
          <span className="author">By {post.author.username}</span>
          <span className="date">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        <div className="post-content">
          {post.content}
        </div>

        {isAuthor && (
          <div className="post-actions">
            <Link to={`/edit/${post._id}`} className="btn btn-secondary">Edit Post</Link>
            <button onClick={handleDelete} className="btn btn-delete">Delete Post</button>
          </div>
        )}

        <Link to="/dashboard" className="btn btn-primary back-btn">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default PostPage;
