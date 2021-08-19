import React from 'react';
import { withRouter } from 'react-router';

import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <section className="Page Page-Login">
      <LoginForm title="Login" />
    </section>
  );
}

export default withRouter(LoginPage);
