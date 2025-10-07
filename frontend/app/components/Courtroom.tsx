'use client';
import React, { useState } from 'react';

export default function CourtroomPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [stages, setStages] = useState<any[]>([]);

  const register = async () => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    alert(data.error || 'Registered!');
  };

  const login = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      setUserId(data.userId);
      alert('Logged in!');
    } else {
      alert(data.error);
    }
  };

  const saveStage = async () => {
    if (!userId) return alert('Login first!');
    const stageData = { message: 'Example stage data' }; // Replace with real stage state
    const res = await fetch('/api/saveStage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, stageData }),
    });
    const data = await res.json();
    alert(data.error || 'Stage saved!');
  };

  const loadStages = async () => {
    if (!userId) return alert('Login first!');
    const res = await fetch(`/api/saveStage?userId=${userId}`);
    const data = await res.json();
    setStages(data);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Courtroom</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={saveStage} disabled={!userId}>💾 Save Stage</button>
        <button onClick={loadStages} disabled={!userId}>📂 Load Stages</button>
      </div>

      {stages.length > 0 && (
        <div>
          <h3>Loaded Stages:</h3>
          <pre>{JSON.stringify(stages, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
