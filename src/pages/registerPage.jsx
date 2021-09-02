import React from 'react';
import { withRouter } from 'react-router';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  return (
    <section className="Page Page-Register">
      <h1>Registration</h1>
      <RegisterForm title="Registration" />
    </section>
  );
}

export default withRouter(RegisterPage);
