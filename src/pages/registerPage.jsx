import React from 'react';
import { withRouter } from 'react-router';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  return (
    <section className="Page Page-Register">
      <RegisterForm title="Registration" />
    </section>
  );
}

export default withRouter(RegisterPage);
