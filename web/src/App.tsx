import React, { useState, useEffect } from "react";

import Menu from "./components/menu";
import Products from "./pages/products";
import Store from "./pages/store";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HOME, PRODUCTS, STORE } from "./routes";

import "./assets/sass/general.sass";
import "./assets/css/navbar.css";
import "./assets/css/slick.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/venobox.css";
import "./assets/css/navbar.css";
import "./assets/css/navbutton.css";
import "./assets/css/banner.css";
import "./assets/css/festiveslider.css";
import "./assets/css/shedule.css";
import "./assets/css/upcoming.css";
import "./assets/css/gallery.css";
import "./assets/css/event.css";
import "./assets/css/pricing.css";
import "./assets/css/sponsor.css";
import "./assets/css/about-page.css";
import "./assets/css/pricingpahe.css";
import "./assets/css/sponsorpage.css";
import "./assets/css/comingsoon.css";
import "./assets/css/error-page.css";
import "./assets/css/footer.css";
import "./assets/css/responsive.css";

const App = (props: any) => {
  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <div id="main-container">
        <Menu />
        <div id="body-container" className="container">
          <Switch>
            <Route exact path={HOME} component={Products} />
            <Route exact path={PRODUCTS} component={Products} />
            <Route exact path={STORE} component={Store} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
