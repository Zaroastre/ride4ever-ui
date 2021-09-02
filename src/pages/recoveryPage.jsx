import React from 'react';
import { withRouter } from 'react-router';
import RecoveryForm from '../components/RecoveryForm';

function PasswordRecoveryPage() {
  return (
    <section className="Page Page-NotFound">
      <h1>Recovery</h1>
      <RecoveryForm title="Account recovery" />
    </section>
  );
}

export default withRouter(PasswordRecoveryPage);
