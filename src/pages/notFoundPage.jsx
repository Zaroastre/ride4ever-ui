import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="Page Page-NotFound">
      <h1>Page not found</h1>
      <p>
        The page you are looking for does not exist.
        It may have been moved, or removed altogether.
        Perhaps you can return back to the site's homepage
        and see if you can find what you are looking for.
      </p>
      <Link to="/">
        <Button type="button" className="p-button p-button-raised p-button-primary" label="Back to Home Page" icon="pi pi-home" />
      </Link>
    </section>
  );
}

export default withRouter(NotFoundPage);
