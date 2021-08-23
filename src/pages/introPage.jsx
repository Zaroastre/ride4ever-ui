import React from 'react';
import { withRouter } from 'react-router';

function IntroPage() {
  return (
    <section className="Page Page-Home">
      <h1 id="intro-title">You are welcome on Ride4Ever !</h1>
      <p>Un bon voyage commence toujours avec</p>
      <p>2 motard.e.s</p>
      <p>2 motos</p>
      <p>donc...</p>
    </section>
  );
}

export default withRouter(IntroPage);
