import React from 'react';
import { withRouter } from 'react-router';

import './style.css';

function Footer() {
  return (
    <footer className="Component Component-Footer">
      <p>
        <small>
          Copyright &copy;
          {(new Date()).getFullYear()}
          , NIRAH-TECHNOLOGY. All Rights Reserved.
        </small>
      </p>
    </footer>
  );
}

export default withRouter(Footer);
