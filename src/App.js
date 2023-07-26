import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/NavbarComponent';

import styled from 'styled-components';
import CotizacionesPage from './pages/CotizacionesPage';
import AutorizacionesPage from './pages/AutorizacionesPage';
import SeguimientoPage from './pages/SeguimientoPage';
import ConfiguracionPage from './pages/ConfiguracionPage';
import HomePage from './pages/HomePage';
import MiPerfilPage from './pages/MiPerfilPage';
import LogInPage from './pages/LogInPage';
import AdministracionUsuariosPage from './pages/AdministracionUsuariosPage';
import RecuperarContraseñaPage from './pages/RecuperarContraseñaPage';
import NotMatchPage from './pages/NotMatchPage';

import FooterComponent from './components/FooterComponent';

import { Container } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import Account from './components/AccountContext';
import UserServices from './services/UsersServices';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';

const Styles = styled.div`

  .contentBody{
    min-height: 100vh;
    padding: 50px;   
    // background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1723' height='615' preserveAspectRatio='none' viewBox='0 0 1723 615'%3e%3cg mask='url(%26quot%3b%23SvgjsMask5851%26quot%3b)' fill='none'%3e%3cpath d='M288.88 256.6a5.6 5.6 0 1 0-10.81-2.93 5.6 5.6 0 1 0 10.81 2.93zM273.44 252.41a5.6 5.6 0 1 0-10.81-2.93 5.6 5.6 0 1 0 10.81 2.93zM258 248.23a5.6 5.6 0 1 0-10.81-2.94 5.6 5.6 0 1 0 10.81 2.94zM242.56 244.04a5.6 5.6 0 1 0-10.81-2.94 5.6 5.6 0 1 0 10.81 2.94zM323.96 249.54a5.6 5.6 0 1 0-10.81-2.93 5.6 5.6 0 1 0 10.81 2.93zM308.51 245.35a5.6 5.6 0 1 0-10.8-2.93 5.6 5.6 0 1 0 10.8 2.93zM293.07 241.16a5.6 5.6 0 1 0-10.81-2.93 5.6 5.6 0 1 0 10.81 2.93zM277.63 236.97a5.6 5.6 0 1 0-10.81-2.93 5.6 5.6 0 1 0 10.81 2.93zM359.03 242.48a5.6 5.6 0 1 0-10.81-2.93 5.6 5.6 0 1 0 10.81 2.93zM343.59 238.29a5.6 5.6 0 1 0-10.81-2.93 5.6 5.6 0 1 0 10.81 2.93zM328.15 234.1a5.6 5.6 0 1 0-10.81-2.93 5.6 5.6 0 1 0 10.81 2.93zM312.7 229.91a5.6 5.6 0 1 0-10.8-2.93 5.6 5.6 0 1 0 10.8 2.93z' fill='rgba(0%2c 0%2c 0%2c 1)'%3e%3c/path%3e%3ccircle r='51.25' cx='1199.25' cy='282.36' fill='rgba(63%2c 61%2c 60%2c 1)'%3e%3c/circle%3e%3crect width='276' height='276' clip-path='url(%26quot%3b%23SvgjsClipPath5852%26quot%3b)' x='1391.55' y='419.26' fill='url(%23SvgjsPattern5853)' transform='rotate(264.13%2c 1529.55%2c 557.26)'%3e%3c/rect%3e%3crect width='263.2' height='263.2' clip-path='url(%26quot%3b%23SvgjsClipPath5854%26quot%3b)' x='1263.5' y='-93.37' fill='url(%23SvgjsPattern5855)' transform='rotate(320.43%2c 1395.1%2c 38.23)'%3e%3c/rect%3e%3crect width='66.8' height='66.8' clip-path='url(%26quot%3b%23SvgjsClipPath5856%26quot%3b)' x='675.66' y='90.55' fill='url(%23SvgjsPattern5857)' transform='rotate(238.39%2c 709.06%2c 123.95)'%3e%3c/rect%3e%3crect width='140' height='140' clip-path='url(%26quot%3b%23SvgjsClipPath5858%26quot%3b)' x='1412.63' y='504.57' fill='url(%23SvgjsPattern5859)' transform='rotate(48.19%2c 1482.63%2c 574.57)'%3e%3c/rect%3e%3crect width='192' height='192' clip-path='url(%26quot%3b%23SvgjsClipPath5860%26quot%3b)' x='965.48' y='158.04' fill='url(%23SvgjsPattern5861)' transform='rotate(329.15%2c 1061.48%2c 254.04)'%3e%3c/rect%3e%3crect width='243.84' height='243.84' clip-path='url(%26quot%3b%23SvgjsClipPath5862%26quot%3b)' x='926.69' y='440.1' fill='url(%23SvgjsPattern5863)' transform='rotate(215.85%2c 1048.61%2c 562.02)'%3e%3c/rect%3e%3cpath d='M1192.64 196.63L1191.37 209.38 1178.65 210.93 1177.38 223.67 1164.67 225.23 1163.4 237.97 1150.69 239.53' stroke='rgba(0%2c 0%2c 0%2c 1)' stroke-width='1'%3e%3c/path%3e%3cpath d='M1382.0600000000002 377.64 L1529.2600000000002 293.14000000000004L1361.120011634807 240.85001163480675z' fill='rgba(240%2c 85%2c 34%2c 0.8)'%3e%3c/path%3e%3cpath d='M1438.7 98.03999999999999 L1568.4299999999998 135.20999999999998L1412.7838560701557 207.4061439298444z' fill='rgba(240%2c 85%2c 34%2c 1)'%3e%3c/path%3e%3cpath d='M120.38 276.22a5.6 5.6 0 1 0 1.21 11.13 5.6 5.6 0 1 0-1.21-11.13zM122.11 292.12a5.6 5.6 0 1 0 1.21 11.14 5.6 5.6 0 1 0-1.21-11.14zM123.84 308.03a5.6 5.6 0 1 0 1.21 11.14 5.6 5.6 0 1 0-1.21-11.14zM125.56 323.94a5.6 5.6 0 1 0 1.21 11.13 5.6 5.6 0 1 0-1.21-11.13zM101.02 246.13a5.6 5.6 0 1 0 1.21 11.14 5.6 5.6 0 1 0-1.21-11.14zM102.75 262.04a5.6 5.6 0 1 0 1.2 11.13 5.6 5.6 0 1 0-1.2-11.13zM104.47 277.95a5.6 5.6 0 1 0 1.21 11.13 5.6 5.6 0 1 0-1.21-11.13zM106.2 293.85a5.6 5.6 0 1 0 1.21 11.14 5.6 5.6 0 1 0-1.21-11.14z' stroke='rgba(0%2c 0%2c 0%2c 1)' stroke-width='2.26'%3e%3c/path%3e%3crect width='372' height='372' clip-path='url(%26quot%3b%23SvgjsClipPath5864%26quot%3b)' x='535.98' y='201.36' fill='url(%23SvgjsPattern5865)' transform='rotate(32.65%2c 721.98%2c 387.36)'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask5851'%3e%3crect width='1723' height='615' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern5853'%3e%3cpath d='M0 6L3 0L6 6' stroke='rgba(240%2c 85%2c 34%2c 1)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath5852'%3e%3ccircle r='69' cx='1529.55' cy='557.26'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='9.4' height='9.4' patternUnits='userSpaceOnUse' id='SvgjsPattern5855'%3e%3cpath d='M0 9.4L4.7 0L9.4 9.4' stroke='rgba(240%2c 85%2c 34%2c 1)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath5854'%3e%3ccircle r='65.8' cx='1395.1' cy='38.23'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6.68' height='6.68' patternUnits='userSpaceOnUse' id='SvgjsPattern5857'%3e%3cpath d='M3.34 1L3.34 5.68M1 3.34L5.68 3.34' stroke='rgba(240%2c 85%2c 34%2c 0.8)' fill='none' stroke-width='1.59'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath5856'%3e%3ccircle r='16.7' cx='709.06' cy='123.95'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='14' height='14' patternUnits='userSpaceOnUse' id='SvgjsPattern5859'%3e%3cpath d='M7 1L7 13M1 7L13 7' stroke='rgba(0%2c 0%2c 0%2c 1)' fill='none' stroke-width='1.36'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath5858'%3e%3ccircle r='35' cx='1482.63' cy='574.57'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern5861'%3e%3cpath d='M0 6L3 0L6 6' stroke='rgba(240%2c 85%2c 34%2c 0.8)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath5860'%3e%3ccircle r='48' cx='1061.48' cy='254.04'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='243.84' height='10.16' patternUnits='userSpaceOnUse' id='SvgjsPattern5863'%3e%3crect width='243.84' height='5.08' x='0' y='0' fill='rgba(240%2c 85%2c 34%2c 0.8)'%3e%3c/rect%3e%3crect width='243.84' height='5.08' x='0' y='5.08' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath5862'%3e%3ccircle r='60.96' cx='1048.61' cy='562.02'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern5865'%3e%3cpath d='M3 1L3 5M1 3L5 3' stroke='rgba(240%2c 85%2c 34%2c 1)' fill='none' stroke-width='1.67'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath5864'%3e%3ccircle r='93' cx='721.98' cy='387.36'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
  }

  .orange{
    color: #f05522;
  }

  .MuiButtonBase-root{
    font-weight: 600;
    /* color:#f05522; */
  }

  .bg-orange
  {
    background-color: #f05522;
    border: 1px solid #f05522;
    color: white;
  }

  .bg-orange:hover
  {
    background-color: #FFF;    
    color:#f05522;
  }

  /* .MuiButton-containedSecondary{
    color: #fff;
    border-color: #f90;
    background-color: #f90;
  } */

  /* .MuiButton-outlinedSecondary{
    color: #747474;
    border-color: #747474;
    background-color: #fff;
  }

  .MuiButton-outlinedSecondary:hover{
    color: #fff;
    border-color: #747474;
    background-color: #747474;
  } */

  .gray{
    color: #747474;
  }

  .gray-clear{
    color: #848486;
  }

  .footer{
        color: #FFFFFF; 
        padding: 25px 0px;       
    }

    .text-right{
      text-align: right !important;
    }

    .contentForm{      
        padding: 20px;
        border-radius: 25px;
        background-color: white;
        box-shadow: rgba(99, 99, 99, 0.5) 0px 2px 8px 0px;
    }

    .contentPage{        
        padding: 20px;
        border-radius: 25px;
        background-color: rgba(0,0,0,0.1);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }

`;

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState(null);

  const authProps = {
    isAuthenticated,
    user,
    setIsAuthenticated,
    setUser,
    getUserType: () => {
      const utid = user ? user.attributes["custom:type_user_id"] : undefined;
      let type;
      switch (utid) {
        case "f6695929-54e9-11eb-923d-066fdd276caa":
          type = "Client"
          break;
        case "f68192b6-54e9-11eb-923d-066fdd276caa":
          type = "Grower"
          break;
        case "f69990ef-54e9-11eb-923d-066fdd276caa":
          type = "Articulator"
          break;
        default:
          type = undefined;
          break;
      }
      return type;
    }
  };

  useEffect(() => {

    Account.getSession()
      .then(async ({ idToken }) => {
        console.log("Session: ", idToken);

        const userSession = {
          idToken: idToken.jwtToken,
          attributes: idToken.payload
        }

        //Obtener informacion del usuario de la bd
        const userDataResult = await UserServices.GetUserById(userSession.attributes.sub);

        //formatear objeto usuario
        userSession.attributes = userDataResult.data;

        setIsAuthenticated(true);
        setUser(userSession);
        setIsAuthenticating(false);
      })
      .catch(err => {
        console.error("Session error: ", err);
        setIsAuthenticating(false);
      });
  }, [])

  return (
    !isAuthenticating &&
    <div className="App">
      <ReactNotification />
      <Styles>
        <Router>

          {
            (isAuthenticated === true) &&
            (
              <header>
                <Navbar auth={authProps} />
              </header>
            )
          }


          <main role="main" className="contentBody">
            <Container fixed>
              <Switch>

                <Route exact path="/" render={(props) => <LogInPage {...props} auth={authProps} />} />
                {/* <Route exact path="/Registro" render={(props) => <RegistroPage {...props} auth={authProps} />} /> */}
                <Route exact path="/RecuperarContraseña" render={(props) => <RecuperarContraseñaPage {...props} auth={authProps} />} />

                <ProtectedRoute exact path="/Home" component={HomePage} auth={authProps} />
                <ProtectedRoute exact path="/Cotizaciones" component={CotizacionesPage} auth={authProps} />
                <ProtectedRoute exact path="/Autorizaciones" component={AutorizacionesPage} auth={authProps} onlyAdmin={true} />
                <ProtectedRoute exact path="/Seguimiento" component={SeguimientoPage} auth={authProps} />
                <ProtectedRoute exact path="/Configuración" component={ConfiguracionPage} auth={authProps} onlyAdmin={true} />
                <ProtectedRoute exact path="/MiPerfil" component={MiPerfilPage} auth={authProps} />
                <ProtectedRoute exact path="/AdministraciónUsuarios" component={AdministracionUsuariosPage} auth={authProps} onlyAdmin={true} />

                <Route exact path="*" render={(props) => <NotMatchPage {...props} auth={authProps} />} />

              </Switch>

            </Container>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          </main>

          {
            (isAuthenticated === true) &&
            (
              <footer style={{ marginTop: "10px", backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
                <Container fixed>
                  <FooterComponent />
                </Container>
              </footer>
            )
          }

        </Router>

      </Styles>
    </div>

  );
}

export default App;
