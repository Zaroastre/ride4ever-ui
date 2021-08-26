import React from 'react';
import { withRouter } from 'react-router';

function IntroPage() {
  return (
    <section className="Page Page-Intro">
      <h1 id="intro-title">You are welcome on Ride4Ever !</h1>
      <p>Un bon voyage commence toujours avec</p>
      <p>2 motard.e.s</p>
      <p>2 motos</p>
      <p>donc...</p>
      <p>
        <>
          Balade organisé à l'occasion d'une virée au bord de la Mer pour le test d'une hypercar.
        </>
        What is
        <strong>Ride 4 Ever</strong>
        ?
      </p>
      <p>
        <strong>Ride 4 Ever</strong>
        is a free web application for bikers.
      </p>
    </section>
  );
}

export default withRouter(IntroPage);
