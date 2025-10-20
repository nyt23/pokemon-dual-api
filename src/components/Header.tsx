import React from 'react';
import headerBg from '../assets/header-bg.svg';
import headerBgTablet from '../assets/header-bg-tablet.svg';
import headerBgMobile from '../assets/header-bg-mobile.svg';
import titleIconLeft from '../assets/title-icon-left.svg';
import titleIconRight from '../assets/title-icon-right.svg';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-background">
        <img src={headerBg} alt="Header background" className="header-bg-image header-bg-desktop" />
        <img src={headerBgTablet} alt="Header background tablet" className="header-bg-image header-bg-tablet" />
        <img src={headerBgMobile} alt="Header background mobile" className="header-bg-image header-bg-mobile" />
        <div className="header-content">
          <div className="title-container">
            <img src={titleIconLeft} alt="Left title icon" className="title-icon left" />
            <h1 className="app-title">Poképedia</h1>
            <img src={titleIconRight} alt="Right title icon" className="title-icon right" />
          </div>
          <p className="app-subtitle">Dual API Edition</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
