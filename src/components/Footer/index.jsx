import React from 'react';
import { withRouter } from 'react-router';

import './style.css';

function Footer() {
  return (
    <footer className="Component Component-Footer">
      <nav>
        <ul>
          <li>A propos</li>
          <li>Qui sommes nous ?</li>
          <li>Nos Partenaires</li>
          <li>F.A.Q</li>
          <li>Contact-nous</li>
        </ul>
      </nav>
      <p>
        <small>
          Copyright &copy;
          {(new Date()).getFullYear()}
          , Ride4Ever. All Rights Reserved.
        </small>
      </p>
    </footer>
  );
}

export default withRouter(Footer);
