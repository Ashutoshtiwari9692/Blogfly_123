import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = ({ isLoggedIn }) => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to BlogHub</h1>
          <p>Share your stories, ideas, and experiences with the world</p>
          <div className="hero-buttons">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="btn btn-primary">
                  Go to Dashboard
                </Link>
                <Link to="/dashboard" className="btn btn-secondary">
                  Create Post
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why BlogHub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Easy to Use</h3>
            <p>Create and publish your posts in minutes with our intuitive editor</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Your content is protected with industry-standard security measures</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Responsive</h3>
            <p>Read and write posts from any device, anytime, anywhere</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Modern Design</h3>
            <p>Beautiful, clean interface that puts your content front and center</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Start Blogging?</h2>
        <p>Join our community of writers and readers today</p>
        {!isLoggedIn && (
          <Link to="/signup" className="btn btn-primary large">
            Create Your Account
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home;
