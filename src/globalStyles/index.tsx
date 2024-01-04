import React, { ReactNode } from 'react';
import './index.scss';

interface GlobalStyleProps {
  children: ReactNode; 
}

function GlobalStyle({ children }: GlobalStyleProps) {
  return (
    <>
      <div className="global-styles">
        {children} 
      </div>
    </>
  ); 
}

export default GlobalStyle;
