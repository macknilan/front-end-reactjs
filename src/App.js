import React, {Suspense, lazy} from 'react';
import Dashboard from "./modules/dashboard/index";
import AppRutas from "./routes";
//import Amazon from '../src/modules/amazon/index';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
 } from "react-router-dom";

function SidebarExample() {
 return (
  <Dashboard>
    <AppRutas/>
  </Dashboard>
 );
}
export default SidebarExample;