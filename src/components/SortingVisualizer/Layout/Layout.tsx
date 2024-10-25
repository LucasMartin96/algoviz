import React from 'react';
import Header from './Header';
import StatusBar from './StatusBar';
import AnimationControls from '../Algorithm/AnimationControls';
import Legend from './Legend';
import { layoutStyles } from '@/styles/layout';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={layoutStyles.card.wrapper}>
      <div className={layoutStyles.section.wrapper}>
        <Header />
        <div className={layoutStyles.section.content}>
          <StatusBar />
          <AnimationControls />
          <Legend />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
