'use client';
import React, { useState } from 'react';
import Header from './components/Header';
import TabManager from './components/TabManager';
import Footer from './components/Footer';
import Login from './components/login';
import StageManager from './components/StageManager';

export default function Home() {
  const [user, setUser] = useState<any | null>(null);

  return (
    <div style={{ paddingBottom: "60px" }}> {/* same height as footer */}
      <Header />
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <StageManager user={user} />
      )}
      <Footer />
    </div>
  );
}
