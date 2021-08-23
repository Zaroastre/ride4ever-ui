/* eslint-disable react/prop-types */
import {
  useEffect,
  useCallback,
} from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetBiker } from '../store/biker/bikerAction';

import './style.css';

function LogoutPage({
  resetBikerInStore,
}) {
  const history = useHistory();

  const logout = useCallback(() => {
    resetBikerInStore();
    history.push('/login');
  }, [resetBikerInStore, history]);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    null
  );
}

const mapDispatchToProps = (dispatch) => ({
  resetBikerInStore: () => dispatch(resetBiker()),
});

export default withRouter(connect(null, mapDispatchToProps)(LogoutPage));
