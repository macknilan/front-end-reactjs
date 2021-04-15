import React, {Suspense, lazy} from 'react';
import Dashboard from "./modules/dashboard/index";
import AppRutas from "./routes";
import Login from './../src/modules/login/index';
import { useState, useEffect} from 'react';

function SidebarExample() {  
  const [alerta, setAlerta] = useState(false);
useEffect(() => {
    const tokenString = sessionStorage.getItem('token');
    //sessionStorage.setItem('token', JSON.stringify(false))
    setAlerta(JSON.parse(tokenString));
}, [alerta]);
 return (
  <div>
   {
     alerta ? 
      <Dashboard>
        <AppRutas/>
      </Dashboard>
      :<Login></Login>
   }
   </div>
 );
}
export default SidebarExample;