'use client';
import React from 'react';

interface CourtroomBackgroundProps {
  courtroomSrc: string;
  deskSrc: string;
  isCourtroom?: boolean;
  children: React.ReactNode;
}

const CourtroomBackground: React.FC<CourtroomBackgroundProps> = ({ courtroomSrc, deskSrc, isCourtroom, children }) => {
  const backgroundImage = isCourtroom ? courtroomSrc : deskSrc;

  return (
    <div
      style={{
        width: '100%',
        minHeight: '600px',             // fixed minimum height
        maxHeight: '800px',             // optional max height
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'contain',      // <-- keep aspect ratio, no stretch
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
};

export default CourtroomBackground;
