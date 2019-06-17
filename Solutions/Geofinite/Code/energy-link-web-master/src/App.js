import React from 'react';
import './index.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainSection from './components/MainSection.js';

function App() {
  return (
    <div className="w-full max-w-full container mx-auto flex flex-wrap items-center mt-0 leading-normal tracking-normal">
      <div className="flex md:flex-row-reverse flex-wrap">
        <Sidebar />
        <MainSection />
      </div>
    </div>
  );
}

export default App;
