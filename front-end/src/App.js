import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import ReservationForm from "./layout/Reservations/ReservationForm"

/**
 * Defines the root application component.
 * @returns {JSX.Element}
 */
function App() {
  return (
    <Switch>
      <Route path="/">
        <Layout />
      </Route>
      <Route>
        <ReservationForm />
      </Route>
    </Switch>
  );
}

export default App;
