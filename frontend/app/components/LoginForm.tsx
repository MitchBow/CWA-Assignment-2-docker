'use client';
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin?: (user: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Logged in as ${data.user.name}`);
        onLogin?.(data.user);
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-color)' }}>
      <h3>Login</h3>
      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ marginRight: '10px', padding: '4px 8px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ marginRight: '10px', padding: '4px 8px' }}
      />
      <button onClick={handleLogin} disabled={loading} style={{ padding: '4px 12px' }}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default LoginForm;
