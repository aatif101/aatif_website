import React from 'react';
import './index.css';
import EditorialPortfolio from './components/EditorialPortfolio';

function App() {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-paper)',
        color: 'var(--color-ink)',
        fontFamily: 'var(--font-sans)',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        minHeight: '100vh',
      }}
    >
      <EditorialPortfolio />
    </div>
  );
}

export default App;
