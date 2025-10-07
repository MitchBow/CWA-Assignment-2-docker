'use client';
import Header from './components/Header';
import TabManager from './components/TabManager';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div style={{ paddingBottom: "60px" }}> {/* same height as footer */}
      <Header />
      <TabManager />
      <Footer />
    </div>
  );
}

