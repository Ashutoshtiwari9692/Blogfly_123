import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import '../styles/Dashboard.css';

const Dashboard = ({ isLoggedIn }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(user);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/api/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/api/posts',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPosts([response.data.post, ...posts]);
      setFormData({ title: '', content: '' });
      setShowForm(false);
      setSuccess('Post created successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPosts(posts.filter(post => post._id !== postId));
      setSuccess('Post deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete post');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="dashboard-container">
        <div className="auth-required">
          <p>Please log in to access the dashboard</p>
          <Link to="/login" className="btn btn-primary">Go to Login</Link>
        </div>
      </div>
    );
  }

  const myPosts = posts.filter(post => post.author._id === currentUser?.id);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Dashboard</h1>
        <p>Welcome back, {currentUser?.username}! 👋</p>
      </div>

      {error && <div className="error-banner">{error}</div>}
      {success && <div className="success-banner">{success}</div>}

      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="btn btn-primary create-btn">
          ✏️ Write New Post
        </button>
      ) : (
        <div className="create-post-card">
          <h2>Create New Post</h2>
          <form onSubmit={handleCreatePost}>
            <div className="form-group">
              <label htmlFor="title">Post Title</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter your post title"
                maxLength="200"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Post Content</label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Write your blog post here..."
                rows="10"
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Publish Post</button>
              <button 
                type="button" 
                onClick={() => setShowForm(false)} 
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="posts-section">
        <h2>Your Posts ({myPosts.length})</h2>
        {myPosts.length === 0 ? (
          <p className="no-posts">You haven't created any posts yet. Start writing! ✍️</p>
        ) : (
          <div className="posts-grid">
            {myPosts.map(post => (
              <div key={post._id} className="post-card">
                <h3>{post.title}</h3>
                <p className="post-date">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="post-excerpt">{post.content.substring(0, 150)}...</p>
                <div className="post-actions">
                  <Link to={`/post/${post._id}`} className="btn btn-secondary">Read More</Link>
                  <Link to={`/edit/${post._id}`} className="btn btn-secondary">Edit</Link>
                  <button 
                    onClick={() => handleDeletePost(post._id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="posts-section">
        <h2>All Blog Posts</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="no-posts">No posts yet. Be the first to write one! 📝</p>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <div key={post._id} className="post-card">
                <h3>{post.title}</h3>
                <p className="post-author">By {post.author.username}</p>
                <p className="post-date">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="post-excerpt">{post.content.substring(0, 150)}...</p>
                <Link to={`/post/${post._id}`} className="btn btn-primary">Read Full Post</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
