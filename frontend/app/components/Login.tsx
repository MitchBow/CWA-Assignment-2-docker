'use client';
import React, { useState } from 'react';
import UserControls from './UserControls';

interface LoginProps {
  saveStages?: () => void;
  loadStages?: () => void;
}

const Login: React.FC<LoginProps> = ({ saveStages, loadStages }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Login failed');
      setMessage('✅ Login successful!');
      setLoggedIn(true);
    } catch {
      setMessage('❌ Login failed');
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Registration failed');
      setMessage('✅ Registration successful!');
      setLoggedIn(true);
    } catch {
      setMessage('❌ Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
      {!loggedIn && (
        <div style={{ width: '90%', maxWidth: '600px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '10px' }}>Login / Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleLogin}
              style={{ flex: 1, padding: '8px', borderRadius: '6px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              style={{ flex: 1, padding: '8px', borderRadius: '6px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              Register
            </button>
          </div>
          {message && <div style={{ color: message.startsWith('✅') ? 'green' : 'red', fontWeight: 'bold', marginTop: '10px' }}>{message}</div>}
        </div>
      )}

      {loggedIn && (
        <UserControls username={username} onSave={saveStages} onLoad={loadStages} />
      )}
    </div>
  );
};

export default Login;
