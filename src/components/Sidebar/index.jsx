import React from 'react';
import { withRouter } from 'react-router';

import './style.css';

function Sidebar() {
  return (
    <nav className="Component Component-Sidebar">
      <ul>
        <li>A propos</li>
        <li>Contact</li>
        <li>A propos</li>
        <li>Contact</li>
        <li>A propos</li>
        <li>Contact</li>
        <li>A propos</li>
        <li>Contact</li>
        <li>A propos</li>
        <li>Contact</li>
        <li>A propos</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default withRouter(Sidebar);
