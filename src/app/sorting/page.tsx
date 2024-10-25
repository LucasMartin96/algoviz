import React from 'react';
import SortingVisualizer from '@/components/SortingVisualizer/SortingVisualizer';
import { layoutStyles } from '@/styles/layout';

export default function SortingPage() {
  return (
    <main className={layoutStyles.page.main}>
      <div className={layoutStyles.page.container}>
        <SortingVisualizer />
      </div>
    </main>
  );
}
