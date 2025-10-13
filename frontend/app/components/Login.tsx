'use client';
import React, { useState } from 'react';
import StageManager from './StageManager';

const API_BASE = 'http://ec2-52-91-140-66.compute-1.amazonaws.com:4080/api';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Login failed (${res.status}): ${text}`);
      }

      setMessage('✅ Login successful!');
      setLoggedIn(true);
    } catch (err: any) {
      console.error('❌ Login failed:', err);
      setMessage(`❌ ${err.message}`);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Registration failed (${res.status}): ${text}`);
      }

      setMessage('✅ Registration successful!');
      setLoggedIn(true);
    } catch (err: any) {
      console.error('❌ Registration failed:', err);
      setMessage(`❌ ${err.message}`);
    }
  };

  if (loggedIn) {
    return <StageManager username={username} />;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '50px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#f9f9f9',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          width: '300px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Login / Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '15px',
            width: '100%',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '20px',
            width: '100%',
          }}
        />
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={handleLogin}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#00C851',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#007E33')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#00C851')}
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#33b5e5',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0099cc')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#33b5e5')}
          >
            Register
          </button>
        </div>
        {message && (
          <div
            style={{
              marginTop: '20px',
              color: message.startsWith('✅') ? '#00C851' : '#FF4444',
              fontWeight: 'bold',
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
