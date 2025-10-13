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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '50px' }}>
      <h2>Login / Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc', width: '200px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc', width: '200px' }}
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>
      {message && (
        <div style={{ color: message.startsWith('✅') ? 'green' : 'red', fontWeight: 'bold' }}>{message}</div>
      )}
    </div>
  );
};

export default Login;
