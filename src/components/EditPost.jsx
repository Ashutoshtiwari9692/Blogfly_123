import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/EditPost.css';

const EditPost = ({ isLoggedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    fetchPost();
  }, [id, isLoggedIn]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/api/posts/${id}`);
      const currentUser = JSON.parse(localStorage.getItem('user'));
      
      if (response.data.author._id !== currentUser.id) {
        setError('You are not authorized to edit this post');
        setLoading(false);
        return;
      }

      setFormData({
        title: response.data.title,
        content: response.data.content
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to load post');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Please fill in all fields');
      setSaving(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await api.put(
        `/api/posts/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess('Post updated successfully!');
      setTimeout(() => navigate(`/post/${id}`), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="edit-container"><p>Loading...</p></div>;
  }

  if (error && !success) {
    return (
      <div className="edit-container">
        <div className="error-card">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2>Edit Post</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Post Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter post title"
              maxLength="200"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Post Content</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Write your content here..."
              rows="12"
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate(`/post/${id}`)} 
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
