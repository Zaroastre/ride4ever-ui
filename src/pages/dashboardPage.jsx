import React, {
  useState,
  useEffect,
} from 'react';
import { useSelector, connect } from 'react-redux';
import { withRouter } from 'react-router';
import DashBoard from '../components/DashBoard';
import RoadtripService from '../services/roadtripService';

function DashboardPage() {

  const biker = useSelector((state) => state.biker.entity);

  const [organizedRoadTrips, setOrganizedRoadTrips] = useState([]);
  const [upcomingRoadTrips, setUpcomingRoadTrips] = useState([]);
  const [pendingRoadTripsRequests, setPendingRoadTripsRequests] = useState([]);
  const [oldRoadTrips, setOldRoadTrips] = useState([]);

  useEffect(() => {
    if (biker) {
      const SERVICE = new RoadtripService();
      SERVICE.findRoadtrips({ organize_pseudo: biker.entity.pseudo })
      .then((roadTrips) => {
        setOrganizedRoadTrips(roadTrips);
      }).catch((exception) => {

      });
      SERVICE.findRoadtrips({ biker_pseudo: biker.entity.pseudo, status: 'COMING_SOON' })
      .then((roadTrips) => {
        setUpcomingRoadTrips(roadTrips);
      }).catch((exception) => {
        
      });
      SERVICE.findRoadtrips({ candidate_pseudo: biker.entity.pseudo })
      .then((roadTrips) => {
        setPendingRoadTripsRequests(roadTrips);
      }).catch((exception) => {
        
      });
      SERVICE.findRoadtrips({ biker_pseudo: biker.entity.pseudo, status: 'TERMINATED' })
      .then((roadTrips) => {
        setOldRoadTrips(roadTrips);
      }).catch((exception) => {
        
      });

    }

  }, [setOrganizedRoadTrips, setUpcomingRoadTrips, setPendingRoadTripsRequests, setOldRoadTrips, biker]);

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

const mapDispatchToProps = () => ({
  // setToastInStore: (data) => dispatch(setToast(data)),
  // resetToastInStore: () => dispatch(resetToast()),
});

export default withRouter(connect(null, mapDispatchToProps)(DashboardPage));
