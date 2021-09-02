import { Button } from 'primereact/button';
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
                <Link to="/tbd">
                  About
                </Link>
              </li>
              <li>
                <Link to="/tbd">
                  Features
                </Link>
              </li>

              <li>
                <Link to="/tbd">
                  F.A.Q
                </Link>
              </li>
              <li>
                <Link to="/tbd">
                  help
                </Link>
              </li>
              <li>
                <Link to="/tbd">
                  Contact
                </Link>
              </li>
              
              <li>
                <Link to="/tbd">
                  Who are we ?
                </Link>
              </li>
              <li>
                <Link to="/tbd">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/tbd">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/tbd">
                  Press
                </Link>
              </li>
              
              <li>
                <Link to="/tbd">
                  CUG
                </Link>
              </li>
              <li>
                <Link to="/tbd">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/tbd">
                  Legals
                </Link>
              </li>
              
              <li>
                <Link to="/tbd">
                  Language
                </Link>
              </li>
            </ul>
          </nav>
        </span>
        <span>
          <img className="Logo" src="/assets/images/logo/Ride4Ever_Logo2.svg" alt="R4E" />
        </span>
        <span>
          <a href="https://www.facebook.com/Ride4Ever/" target="_blank">
            <Button icon="pi pi-facebook" />
          </a>
          <a href="https://www.instagram.com/ride4ever/" target="_blank">
            <Button icon="pi pi-instagram" />
          </a>
          <a href="https://www.youtube.com/channel/UClpHedqBZ8YgfDR_D1cdDOg" target="_blank">
            <Button icon="pi pi-youtube" />
          </a>

          <a href="https://discord.gg/JevzBxvq" target="_blank">
            <Button icon="pi pi-discord" />
          </a>

          <a href="" target="_blank">
            <Button icon="pi pi-github" />
          </a>
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
