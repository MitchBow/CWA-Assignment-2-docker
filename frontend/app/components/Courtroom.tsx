'use client';
import React from 'react';

interface CourtroomProps {
  visible: boolean;       // <-- must exist
  reason: string;
  onRetry: () => void;
}

const Courtroom: React.FC<CourtroomProps> = ({ visible, reason, onRetry }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
      }}
    >
      <h1>⚖️ Courtroom</h1>
      <p>{reason}</p>
      <button
        onClick={onRetry}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: '#f39c12',
          color: 'white',
        }}
      >
        Retry
      </button>
    </div>
  );
};

export default Courtroom;
