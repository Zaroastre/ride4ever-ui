/* eslint-disable react/prop-types */
import React, {
  useState,
  useEffect,
} from 'react';
import { useSelector, connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import DashBoard from '../components/DashBoard';
import RoadtripService from '../services/roadtripService';
import { setToast, resetToast } from '../store/toast/toastAction';

function DashboardPage({
  setToastInStore,
  resetToastInStore,
}) {
  const history = useHistory();
  const biker = useSelector((state) => state.biker.entity);
  const [organizedRoadTrips, setOrganizedRoadTrips] = useState([]);
  const [upcomingRoadTrips, setUpcomingRoadTrips] = useState([]);
  const [pendingRoadTripsRequests, setPendingRoadTripsRequests] = useState([]);
  const [oldRoadTrips, setOldRoadTrips] = useState([]);

  useEffect(() => {
    if (biker) {
      const SERVICE = new RoadtripService();
      SERVICE.findRoadtrips({ organizer_pseudo: biker.entity.pseudo })
        .then((roadTrips) => {
          setOrganizedRoadTrips(roadTrips);
        }).catch((exception) => {
          setToastInStore({
            severity: 'error',
            summary: 'Provisioning Failure',
            detail: exception.error,
          });
          resetToastInStore();
        });
      SERVICE.findRoadtrips({ biker_pseudo: biker.entity.pseudo, status: 'COMING_SOON' })
        .then((roadTrips) => {
          setUpcomingRoadTrips(roadTrips);
        }).catch((exception) => {
          setToastInStore({
            severity: 'error',
            summary: 'Provisioning Failure',
            detail: exception.error,
          });
          resetToastInStore();
        });
      SERVICE.findRoadtrips({ candidate_pseudo: biker.entity.pseudo })
        .then((roadTrips) => {
          setPendingRoadTripsRequests(roadTrips);
        }).catch((exception) => {
          setToastInStore({
            severity: 'error',
            summary: 'Provisioning Failure',
            detail: exception.error,
          });
          resetToastInStore();
        });
      SERVICE.findRoadtrips({ biker_pseudo: biker.entity.pseudo, status: 'TERMINATED' })
        .then((roadTrips) => {
          setOldRoadTrips(roadTrips);
        }).catch((exception) => {
          setToastInStore({
            severity: 'error',
            summary: 'Provisioning Failure',
            detail: exception.error,
          });
          resetToastInStore();
        });
    } else {
      history.push('/login');
    }
  }, [
    setOrganizedRoadTrips,
    setUpcomingRoadTrips,
    setPendingRoadTripsRequests,
    setOldRoadTrips,
    setToastInStore,
    resetToastInStore,
    biker,
    history,
  ]);

  return (
    <section className="Page Page-Login">
      <DashBoard
        organizedRoadTrips={organizedRoadTrips}
        upcomingRoadTrips={upcomingRoadTrips}
        pendingRoadTripsRequests={pendingRoadTripsRequests}
        oldRoadTrips={oldRoadTrips}
      />
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setToastInStore: (data) => dispatch(setToast(data)),
  resetToastInStore: () => dispatch(resetToast()),
});

export default withRouter(connect(null, mapDispatchToProps)(DashboardPage));
