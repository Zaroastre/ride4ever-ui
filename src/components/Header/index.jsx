import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Divider } from 'primereact/divider';

import './style.css';

function Header() {
  return (
    <header className="Component Component-Header">
      <span>
        <a href="./">
          <img src="/assets/images/icons/NIRAHTECH_ICON.svg" alt="icon" />
        </a>
      </span>
      <span>
        <nav>
          <span>
            My Account
          </span>
          <ul>
            <Link to="/login">
              <Button label="Login" />
            </Link>
            <Divider />
            <Link to="/profile">Account settings</Link>
            <Divider />
            <Link to="/register">Create an account</Link>
          </ul>
        </nav>
      </span>
    </header>
  );
}

export default withRouter(Header);
