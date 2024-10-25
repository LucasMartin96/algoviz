'use client';

import React from 'react';
import DijkstraVisualizer from './DijkstraVisualizer/DijkstraVisualizer';

const DijkstraWrapper = () => {
  return (
    <div className="w-full h-full max-h-[800px]">
      <DijkstraVisualizer />
    </div>
  );
};

export default DijkstraWrapper;
