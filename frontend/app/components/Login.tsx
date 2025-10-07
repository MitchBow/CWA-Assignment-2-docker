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

  const loginRegister = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Login/Register failed');
      setMessage('✅ Login/Register successful!');
      setLoggedIn(true);
    } catch {
      setMessage('❌ Login/Register failed');
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
          <button onClick={loginRegister} style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>Login / Register</button>
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
