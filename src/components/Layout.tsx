import React from 'react';
import ScoreBoard from './player/ScoreBoard';
import AdminPanel from './admin/AdminPanel';
import '../styles/Layout.css';

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <header className="app-header" role="banner">
        <h1>SuperBowl</h1>
        <nav role="navigation" aria-label="Main navigation">
          <h2 className="visually-hidden">Main Navigation</h2>
        </nav>
      </header>
      
      <main className="app-content" role="main">
        <h2 className="visually-hidden">Bowling Score Tracker</h2>
        
        <section className="player-section" aria-label="Score Board">
          <h3 className="visually-hidden">Current Game Score</h3>
          <ScoreBoard />
        </section>
        
        <section className="admin-section" aria-label="Game Controls">
          <h3 className="visually-hidden">Game Controls</h3>
          <AdminPanel />
        </section>
      </main>
      
      <footer className="app-footer" role="contentinfo">
        <p>&copy; {new Date().getFullYear()} SuperBowl - Modern Bowling Score Tracker</p>
        <nav aria-label="Footer Navigation">
          <ul className="footer-links">
            <li><a href="#" aria-label="How to Play">How to Play</a></li>
            <li><a href="#" aria-label="About SuperBowl">About</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Layout;