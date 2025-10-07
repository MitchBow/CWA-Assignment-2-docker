'use client';
import React from 'react';
import Header from '../components/Header';
import ManualTimer from '../components/ManualTimer';
import StageManager from '../components/StageManager';

export default function CourtroomPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f8f8' }}>
      <Header />


      {/* StageManager full width */}
      <div style={{ width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
        <StageManager />
      </div>
    </div>
  );
}
