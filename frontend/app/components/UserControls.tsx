'use client';
import React from 'react';

interface UserControlsProps {
  username: string;
  onSave?: () => void;
  onLoad?: () => void;
}

const UserControls: React.FC<UserControlsProps> = ({ username, onSave, onLoad }) => {
  return (
    <div style={{
      width: '90%',
      maxWidth: '600px',
      backgroundColor: 'white',
      padding: '15px 20px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px'
    }}>
      <div>
        <strong>Logged in as:</strong> {username}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {onSave && (
          <button
            onClick={onSave}
            style={{
              padding: '8px',
              borderRadius: '6px',
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Save Stages
          </button>
        )}
        {onLoad && (
          <button
            onClick={onLoad}
            style={{
              padding: '8px',
              borderRadius: '6px',
              backgroundColor: '#f39c12',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Load Stages
          </button>
        )}
      </div>
    </div>
  );
};

export default UserControls;
