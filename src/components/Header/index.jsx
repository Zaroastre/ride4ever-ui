import React from 'react';
import { withRouter } from 'react-router';
import { useSelector, connect } from 'react-redux';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import { Tooltip } from 'primereact/tooltip';
import { setLanguage } from '../../store/language/languageAction';

import DICTIONARY from '../../locales/dictionary';

import './style.css';

function Header({
  setlanguageInStore,
}) {
  const biker = useSelector((state) => state.biker.entity);
  const language = useSelector((state) => state.language.value);

  return (
    <header className="Component Component-Header">
      <div className="Bar BarTop">
        <span className="LogoContainer">
          <a href="./">
            <img className="AppLogo" src="/assets/images/icons/NIRAHTECH_ICON.svg" alt="icon" />
          </a>
        </span>
        <span className="SecondaryMenu">
          <span className="InteractiveIcon">
            <Button icon="pi pi-bell" tooltip="Notifications" tooltipOptions={{ position: 'bottom' }} />
          </span>
          <span className="InteractiveIcon">
            <Button icon="pi pi-envelope" tooltip="Messages" tooltipOptions={{ position: 'bottom' }} />
          </span>
          <span className="InteractiveIcon">
            <Link to="/profile">
            <Button icon="pi pi-user" tooltip="Account" tooltipOptions={{ position: 'bottom' }} />
            </Link>
          </span>
        </span>
      </div>
      <div className="Bar BarLeft">
        <nav>
          <ul>
            {
              biker ? (
                <li>
                  <Link to="/dashboard">
                    <span className="MenuItemIcon">
                      <i className="pi pi-home" style={{ 'fontSize': '1.5rem' }} />
                    </span>
                    <span className="MenuItemText">
                      {DICTIONARY.MENU.DASHBOARD[language]}
                    </span>
                  </Link>
                </li>
              ) : (null)
            }
            <li>
              <Link to="/explore">
                <span className="MenuItemIcon">
                  <i className="pi pi-calendar" style={{ 'fontSize': '1.5rem' }} />
                </span>
                <span className="MenuItemText">
                  {DICTIONARY.MENU.ROADTRIP[language]}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setlanguageInStore: (data) => dispatch(setLanguage(data)),
});

export default withRouter(connect(null, mapDispatchToProps)(Header));
