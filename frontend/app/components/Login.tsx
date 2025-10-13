'use client';
import React, { useState } from 'react';
import StageManager from './StageManager';

interface LoginProps {
  username: string;
  setUsername: (name: string) => void;
}

const API_BASE = 'http://ec2-52-91-140-66.compute-1.amazonaws.com:4080/api';

const Login: React.FC<LoginProps> = ({ username, setUsername }) => {
  const [localUsername, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: localUsername, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Login failed (${res.status}): ${text}`);
      }

      setMessage('✅ Login successful!');
      setLoggedIn(true);
      setUsername(localUsername);
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: localUsername, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Registration failed (${res.status}): ${text}`);
      }

      setMessage('✅ Registration successful!');
      setLoggedIn(true);
      setUsername(localUsername);
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '50px 0',
        paddingLeft: '130px', 
        fontFamily: 'Arial, sans-serif',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {!loggedIn ? (
        <div
          style={{
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            width: '320px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <h2 style={{ marginBottom: '25px', color: '#222' }}>Login / Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={localUsername}
            onChange={(e) => setLocalUsername(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginBottom: '15px',
              width: '100%',
              outline: 'none',
              transition: '0.2s border-color',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#33b5e5')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#ccc')}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginBottom: '20px',
              width: '100%',
              outline: 'none',
              transition: '0.2s border-color',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#33b5e5')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#ccc')}
          />
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={handleLogin}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#00C851',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: '0.2s background-color',
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
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#33b5e5',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: '0.2s background-color',
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
      ) : (
        <div
          style={{
            backgroundColor: '#f0f9ff',
            padding: '30px 40px',
            borderRadius: '16px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
            textAlign: 'center',
            color: '#0073e6',
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          Welcome, {username}! 🎉
          <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#555' }}>
            You are now logged in.
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
