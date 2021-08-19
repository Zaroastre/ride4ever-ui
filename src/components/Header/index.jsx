import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Divider } from 'primereact/divider';

import './style.css';

function Header() {
  return (
    <header className="Component Component-Header">
      <span>
        <a href="./">
          <img src="https://download.flaticon.com/download/icon/618988?icon_id=618988&author=164&team=164&keyword=Motorcycle&pack=618963&style=Flat&style_id=8&format=svg&color=%23000000&colored=2&size=512&selection=1&premium=0&type=standard&token=03AGdBq2729iAl0Ev8GdT95_CTgfax8SXV0LO564UnoBiXQGt8R3dNK9qcw8DPaebW-RgPjeWhORWIXJOJwH1yBH0mF877Oszk0NT2eMVkFlLJiW4LLCnGhJhYLue3JyzgPHVlzAXQmK2h4r0AQqjautCMGlR2IP3NS4cgjCfLLLChwFbnJqYagGt48g59HZz4mF7v9GY7btzQ3v7QiWncrFwmBxS4wqbply3-2uZWC_BMkT_g5kmmMBJbFH8jW1MSdob7Dn8NdDkOsAmDUWSo-nzPy0gkKOmVTgNXGYtswueSDFwhgxo-VzSj2xJawDmihv_8cb3uffNmMaEwe5bsT8onDQVCB7oj3jpdLM-4HFWrCHmcC4Rf2zpg1Xrp6wnzpbBPS1QGFVhiz7MDAjXevl3KpcVbRGK-BXhatNQsTfFHFwNB6bImleRdFF03fsTqFhOIK-WXuFKrQcxFqOPkGatbAliluXf4i_6fJIWRDwXxFoohETNU2HGONr7g-LvXRobAD8TFRnqlgR8BQe4DYTjeHJvFqYGqXlMu-X13DSpsQTbrvJAYHAZciPJwOARp13tH8AvrpnVrdFkUkk5lWRc5vz_ugeg531cKSKUGj-FtJ9smoU1iyxFU4CUypfdd8Im6Wv61Od7rtr_Dq17L5c-WeKlCKHzTI6LEOBU-COUw3KOmUW17WBn7wmGBxlXAtowQmcPBR5rgPcuE934hA_egQBUn0IlI_tW6FOZoc31u8KTeN9ni7DhrF72qs5KBA9EoWnnm9JefzHUlHcvAxUhbWrFFSG2O8ewP5aIB_soLtn9SmultjTPzePoPcwI1230FosR-AVMTE4kjOdvhv_PHKlglliHNSA69hXYTI7DWvqyfUjBdXS4G-qZAkxfpdblMH5PoB_SGYdyjo__CLnTFlvqJJpdayjnIvYoo_TfWdk5PDPE5X_U8WA-MTCJ5VDm4L05048sEHLXwiSluCrehcKsnhbRx4BC70Wqlt7fvOe2Hyzbjx95KSyQ3qW3Jyk08vuGxsD1fHzLLbSZrzNB3dfSKdOvhDItvW2ZRrRmv2txSt8Tu6L9CoOyg6jsd4TgnC59xvbcWLMX2-vFG5hiwm7gVcaML-Q&search=motorcycle" alt="icon" />
        </a>
      </span>
      <span>
        <Link to="/login">
          <Button label="Login" />
        </Link>
        <Divider />
        <Link to="/profile">Account settings</Link>
        <Divider />
        <Link to="/register">Create an account</Link>
      </span>
    </header>
  );
}

export default withRouter(Header);
