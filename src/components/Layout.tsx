import React from 'react';
import ScoreBoard from './player/ScoreBoard';
import AdminPanel from './admin/AdminPanel';
import '../styles/Layout.css';

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <header className="app-header">
        <h1>SuperBowl</h1>
      </header>
      
      <main className="app-content">
        <section className="player-section">
          <ScoreBoard />
        </section>
        
        <section className="admin-section">
          <AdminPanel />
        </section>
      </main>
      
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} SuperBowl</p>
      </footer>
    </div>
  );
};

export default Layout;