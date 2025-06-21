import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      console.log('Attempting to sign in with:', { 
        email: formData.email, 
        rememberMe: formData.rememberMe 
      });
      
      // Try with direct fetch first to bypass potential axios issues
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(`🚀 Welcome ${data.data.user.firstName}! Admin Dashboard Access Granted`);
        console.log('Admin user data:', data.data);
        
        // Store the JWT token and admin data
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('dashboardAccess', 'true');
        localStorage.setItem('userRole', data.data.user.userType);
        
        // Redirect to admin dashboard after 2 seconds
        setTimeout(() => {
          console.log('🎯 Redirecting to Admin Dashboard...');
          navigate('/admin/dashboard');
        }, 2000);
      } else {
        setError(data.message || 'Failed to sign in. Please check your credentials.');
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Network error. Please check if the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Implement password reset flow
    alert("Password reset functionality coming soon!");
  };

  return (
    <div className="signin-container">
      {/* Background with geometric patterns */}
      <div className="background-pattern"></div>
      
      {/* Floating shapes */}
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      <div className="shape-3"></div>
      <div className="shape-4"></div>

      {/* Main sign-in card */}
      <div className="signin-card">
        <div className="card-header">
          <h1 className="signin-title">
            Admin Dashboard 
            <span className="crypto-icon">♦</span>
          </h1>
          <p className="signin-subtitle">Blockchain Admin Portal - Authorized Access Only</p>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div style={{ 
            background: '#ffebee', 
            color: '#c62828', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        {success && (
          <div style={{ 
            background: '#e8f5e8', 
            color: '#2e7d32', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {success}
          </div>
        )}

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              Remember me
            </label>
            <a href="#" onClick={handleForgotPassword} className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="signin-btn" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        

      </div>
    </div>
  );
};

export default SignIn;