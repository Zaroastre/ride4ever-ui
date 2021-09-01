import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import './style.css';

function Footer() {
  return (
    <footer className="Component Component-Footer">
      <div>
        <span>
          <nav>
            <ul>
              <li>
                <Link to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link to="/us">
                  Who are we ?
                </Link>
              </li>
              <li>
                <Link to="/partners">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/help">
                  F.A.Q
                </Link>
              </li>
            </ul>
          </nav>
        </span>
        <span>
          Email
          Phone
        </span>
      </div>
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
