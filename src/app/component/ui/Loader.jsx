import React from 'react';

export default function Loader() {
  return (
    <div className="page-loader">
      {/* Animated background gradient */}
      <div className="page-loader__bg" />

      {/* Main spinner container */}
      <div className="page-loader__content">
        {/* Outer ring */}
        <div className="page-loader__ring page-loader__ring--outer" />
        {/* Inner ring */}
        <div className="page-loader__ring page-loader__ring--inner" />
        {/* Center pulse dot */}
        <div className="page-loader__pulse" />
      </div>

      {/* Loading text */}
      <div className="page-loader__text">
        <span className="page-loader__dot" style={{ animationDelay: '0s' }}>.</span>
        <span className="page-loader__dot" style={{ animationDelay: '0.2s' }}>.</span>
        <span className="page-loader__dot" style={{ animationDelay: '0.4s' }}>.</span>
      </div>
    </div>
  );
}
