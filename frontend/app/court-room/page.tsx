'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import StageManager from '../components/StageManager';
import Login from '../components/Login';
import ManualTimer from '../components/ManualTimer';

export default function CourtroomPage() {
  const [username, setUsername] = useState('');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f8f8' }}>
      {/* Header with bottom padding */}
      <div style={{ paddingBottom: '50px' }}>
        <Header />
      </div>

      {/* Login + Timer row just below header */}
      <div style={{ width: '100%', padding: '0 20px', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '10px' }}>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'flex-start' }}>
          <Login saveStages={() => console.log('save')} loadStages={() => console.log('load')} />
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'flex-end' }}>
          <ManualTimer />
        </div>
      </div>

      {/* StageManager full width */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0 20px', boxSizing: 'border-box' }}>
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <StageManager username={username} />
        </div>
      </div>
    </div>
  );
}
