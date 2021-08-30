import React, {
  useEffect,
} from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Divider } from 'primereact/divider';
import { setLanguage } from '../../store/language/languageAction';
import { setReservations } from '../../store/reservation/reservationAction';

import DICTIONARY from '../../locales/dictionary';
import ReservationService from '../../services/reservationService';
import './style.css';

function Header() {
  const biker = useSelector((state) => state.biker.people);
  const language = useSelector((state) => state.language.value);
  const reservations = useSelector((state) => state.reservations.list);

  useEffect(() => {
    if (biker !== null) {
      const SERVICE = new ReservationService();
      SERVICE.findReservations({ biker_pseudo: biker.pseudo, status: 'CREATED' }).then((list) => {
        setReservations(list);
      }).catch((exception) => {
        console.log(exception);
      });
    }
  }, [biker]);

  return (
    <header className="Component Component-Header">
      <div className="Bar BarTop">
        <span className="LogoContainer">
          <a href="./">
            <img className="AppLogo" src="/assets/images/icons/NIRAHTECH_ICON.svg" alt="icon" />
          </a>
        </span>
        <span className="SecondaryMenu">
          {(biker) ? (
            <>
              <span className="InteractiveIcon">
                <Button tooltip="Notifications" tooltipOptions={{ position: 'bottom' }}>
                  <i className="pi pi-bell" />
                  <span className="BadgeContainer">
                    <Badge value="2" severity="info" className="p-mr-2" />
                  </span>
                </Button>
              </span>
              <span className="InteractiveIcon">
                <Button tooltip="Messages" tooltipOptions={{ position: 'bottom' }}>
                  <i className="pi pi-envelope" />
                  <span className="BadgeContainer">
                    <Badge value="10" severity="warning" className="p-mr-2" />
                  </span>
                </Button>
              </span>
              <Divider layout="vertical" />
              <span className="InteractiveIcon">
                <Link to="/reservation">
                  <Button tooltip="Reservations" tooltipOptions={{ position: 'bottom' }}>
                    <i className="pi pi-calendar" />
                    {
                      (reservations.length > 0) ? (
                        <span className="BadgeContainer">
                          <Badge value={reservations.length} severity="danger" className="p-mr-2" />
                        </span>
                      ) : (null)
                    }
                  </Button>
                </Link>
              </span>
              <Divider layout="vertical" />
            </>
          ) : (null)}
          <span className="InteractiveIcon">
            <Link to="/profile">
              <Button icon="pi pi-user" tooltip="Account" tooltipOptions={{ position: 'bottom' }} />
            </Link>
          </span>
        </span>
      </div>
      {
        (biker) ? (
          <div className="Bar BarLeft">
            <nav>
              <ul>
                <li>
                  <Link to="/dashboard">
                    <span className="MenuItemIcon">
                      <i className="pi pi-home" style={{ fontSize: '1.5rem' }} />
                    </span>
                    <span className="MenuItemText">
                      {DICTIONARY.MENU.DASHBOARD[language]}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/explore">
                    <span className="MenuItemIcon">
                      <i className="pi pi-globe" style={{ fontSize: '1.5rem' }} />
                    </span>
                    <span className="MenuItemText">
                      {DICTIONARY.MENU.ROADTRIP[language]}
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        ) : (null)
      }
    </header>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setlanguageInStore: (data) => dispatch(setLanguage(data)),
});

export default withRouter(connect(null, mapDispatchToProps)(Header));
