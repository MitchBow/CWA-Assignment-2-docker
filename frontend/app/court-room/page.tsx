'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import StageManager from '../components/StageManager';
import Login from '../components/Login';
import ManualTimer from '../components/ManualTimer';
import CourtroomBackground from '../components/CourtroomBackground';
import NotificationManager from '../components/NotificationManager'; // <-- import it

export default function CourtroomPage() {
  const [username, setUsername] = useState('');
  const [isCourtroom, setIsCourtroom] = useState(false);

  return (
    <CourtroomBackground
      courtroomSrc="/images/courtroom.jpg"
      deskSrc="/images/desk.jpg"
      isCourtroom={isCourtroom}
    >
      <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
        {/* Header with padding */}
        <div style={{ paddingBottom: '50px' }}>
          <Header />
        </div>

        {/* Login + Timer Row */}
        <div style={{
          width: '100%',
          padding: '0 20px',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginTop: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'flex-start' }}>
            <Login />
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

        {/* NotificationManager */}
        <NotificationManager onCourtroom={setIsCourtroom} />
      </div>
    </CourtroomBackground>
  );
}
