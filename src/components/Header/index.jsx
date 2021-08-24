import React from 'react';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Divider } from 'primereact/divider';

import './style.css';

function Header() {
  const biker = useSelector((state) => state.biker.entity);
  // const [activeIndex, setActiveIndex] = useState(3);

  return (
    <header className="Component Component-Header">
      <span>
        <a href="./">
          <img src="/assets/images/icons/NIRAHTECH_ICON.svg" alt="icon" />
        </a>
      </span>
      <span>
        <nav>
          <ul>
            {
              biker ? (
                <li><Link to="/dashboard">Dashboard</Link></li>
              ) : (null)
            }
            <li>
              <Link to="/explore">Road Trip</Link>
              <ul>
                <li><Link to="/join">Search</Link></li>
                <li><Link to="/organize">Organize</Link></li>
              </ul>
            </li>
            <li>
              Account
              <ul>
                {
                  biker ? (
                    <>
                      <li><Link to="/profile">Account settings</Link></li>
                      <Divider />
                      <li>
                        <Link to="/logout">
                          <Button label="Logout" />
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/login">
                          <Button label="Login" />
                        </Link>
                      </li>
                      <Divider />
                      <li><Link to="/register">Create an account</Link></li>
                    </>
                  )
                }
              </ul>
            </li>
          </ul>
        </nav>
      </span>
    </header>
  );
}

export default withRouter(Header);
