import React, {Suspense, lazy} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


const Administracion = lazy(() => import ('../src/modules/administracion/index'));
const Clientes = lazy(() => import ('../src/modules/clientes/index'));
const login = lazy(() => import ('../src/modules/login/index'));



const AppRoutes = (props) =>
    <Suspense fallback={<div className="progress"><div className="indeterminate"></div></div>}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/administracion/index" component={Administracion}/>
                <Route exact path="/clientes/index" component={Clientes}/>
                <Route exact path="/login/index" component={login}/>
            </Switch>
        </BrowserRouter>
    </Suspense>
;

export default AppRoutes;
