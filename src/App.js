import React, { useEffect, useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import IdleTimer from "./IdleTimer";
//import { AuthContext } from "./context/Auth";
import Login from './containers/login/LoginContainer';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Categoria from './containers/catalogos/Categoria/CategoriaContainer';
import CambioCategoria from './containers/catalogos/CambioCategoria/CambioCategoriaContainer';
import Clasificacion from './containers/catalogos/Clasificacion/ClasificacionContainer';
import Consultas from './containers/catalogos/Consultas/ConsultasContainer';
import MotivoAnulacion from './containers/catalogos/MotivoAnulacion/MotivoAnulacionContainer';
import CatMuestras from './containers/catalogos/Muestras/MuestrasContainer';
import TipoMuestras from './containers/catalogos/TipoMuestras/TipoMuestrasContainer';
import TipoPruebas from './containers/catalogos/TipoPruebas/TipoPruebasContainer';
import Tubos from './containers/catalogos/Tubos/TubosContainer';
import Visitas from './containers/catalogos/Visitas/VisitasContainer';
import MismoEpFebrilContainer from './containers/catalogos/MismoEpFebril/MismoEpFebrilContainer';
import ResultadosMuestrasContainer from './containers/catalogos/ResultadosMuestras/ResultadosMuestrasContainer';

import AddUser from './containers/security/users/RegisterContainer';
import Users from './containers/security/users/UserListContainer';
import ChangePassword from "./containers/security/users/ChangePasswordContainer";

import ProfileListContainer from './containers/security/roles/ProfileListContainer';
import ProfileContainer from './containers/security/roles/ProfileContainer';
import ProfileOptionsMenuContainer from './containers/security/roles/ProfileOptionsMenuContainer';

import UserProfileListContainer from './containers/security/usersRoles/UserProfileListContainer';
import UserProfileContainer from './containers/security/usersRoles/UserProfileContainer';

import MenuListContainer from './containers/security/menus/MenuListContainer';
import MenuContainer from './containers/security/menus/MenuContainer';
import MenuOptionsListContainer from './containers/security/menus/MenuOptionsListContainer';
import MenuOptionContainer from './containers/security/menus/MenuOptionContainer';

import MxInfluenzaListContainer from './containers/mxInfluenza/MxInfluenzaListContainer';
import MxInfluenzaContainer from './containers/mxInfluenza/MxInfluenzaContainer';

import MxU01ListContainer from './containers/mxU01/MxU01ListContainer';
import MxU01Container from './containers/mxU01/MxU01Container';

import MxTransmisionListContainer from './containers/mxTransmision/MxTransmisionListContainer';
import MxTransmision from './containers/mxTransmision/MxTransmisionContainer';

import MxTransmisionLnListContainer from './containers/mxTransmisionLn/MxTransmisionLnListContainer';
import MxTransmisionLnContainer from './containers/mxTransmisionLn/MxTransmisionLnContainer';

import MxBhcListContainer from './containers/mxBhc/MxBhcListContainer';
import MxBhcContainer from './containers/mxBhc/MxBhcContainer';

import RecepcionMxContainer from "./containers/recepcionMx/RecepcionMxContainer";

import MxDengueListContainer from "./containers/mxDengue/MxDengueListContainer";
import MxDengueContainer from "./containers/mxDengue/MxDengueContainer";

const App = () => {
  const [isTimeout, setIsTimeout] = useState(false);

  //let location = useLocation();

  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 900, //Expira en 15 minutos
      onTimeout: () => {
        setIsTimeout(true);
      },
      onExpired: () => {
        setIsTimeout(true);
      }
    });

    return () => {
      timer.cleanUp();
    };
  }, []);

  const LogoutTimeExpired = () => {
    if (isTimeout) {
      localStorage.removeItem("_expiredTime");
      localStorage.removeItem('token');
      localStorage.removeItem('accountData');
      //setAuthToken();
      return <Redirect to='/login' />
      //history.push('/');
    }
  }

  /**Funcion para deshabilitar f12 y el click derecho en el sistema */
  /* const disableDeveloperToolBar = () => {
    document.onkeydown = (event) => {
      event = (event || window.event);
      if (event.keyCode === 123 || event.keyCode === 18) {
        alert("Esta funcion esta deshabilitada");
        return false;
      }
    }

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  } */

  //const existingToken = localStorage.getItem('token');

  /* const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const setToken = () => {
    setAuthToken(localStorage.getItem('token'));
  } */

  return (
    <>
      <Router>
        <div className="App">
          {LogoutTimeExpired()}
          <Switch>
            {/* <Route exact path='/' component={Login} /> */}
            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Login} />
            <>
              {/* <Header /> */}
              <Route path="/home"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <Home {...props} />
                  </Header>
                )}
              />
              <Route path="/catalogo/categoria"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <Categoria {...props} />
                  </Header>
                )}
              />
              <Route path="/catalogo/cambio-categoria"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <CambioCategoria {...props} />
                  </Header>
                )}
              />
              <Route path="/catalogo/clasificacion"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <Clasificacion {...props} />
                  </Header>
                )}
              />
              <Route path="/catalogo/consultas"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <Consultas {...props} />
                  </Header>
                )}
              />
              <Route path="/catalogo/motivo-anulacion"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MotivoAnulacion {...props} />
                  </Header>
                )}
              />
              <Route path="/catalogo/cat-muestras"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <CatMuestras {...props} />
                  </Header>
                )}
              />
              <Route path="/catalogo/tipo-muestras"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <TipoMuestras {...props} />
                  </Header>
                )}
              />
              <Route path="/catalogo/tipo-pruebas"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <TipoPruebas {...props} />
                  </Header>
                )}
              />
              <Route path="/catalogo/tubos"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <Tubos {...props} />
                  </Header>
                )}
              />
              <Route path="/catalogo/visitas"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <Visitas {...props} />
                  </Header>
                )}>

              </Route>
              <Route path="/catalogo/episodios-febriles"
                exact
                render={props => (
                  <Header {...props}>
                    <MismoEpFebrilContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/catalogos/resultados-muestras"
                exact
                render={props => (
                  <Header {...props}>
                    <ResultadosMuestrasContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/usuarios"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <Users {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/registrar-usuarios"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <AddUser {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/editar-usuario/:id"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <AddUser {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/cambiar-clave/:id"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <ChangePassword {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/perfiles"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <ProfileListContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/agregar-perfil"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <ProfileContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/editar-perfil/:id"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <ProfileContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/perfil-usuario"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <UserProfileListContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/asignar-perfil-usuario"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <UserProfileContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/editar-perfil-usuario/:id"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <UserProfileContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/menu"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MenuListContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/agregar-menu"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MenuContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/editar-menu/:id"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MenuContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/opciones-menu"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MenuOptionsListContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/agregar-opcion-menu"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MenuOptionContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/editar-opcion-menu/:id"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MenuOptionContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/seguridad/perfil-opciones-menu"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <ProfileOptionsMenuContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/muestras/influenza"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MxInfluenzaListContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/muestras/agregar-muestra-influenza"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MxInfluenzaContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/muestras/editar-muestra-influenza/:id"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MxInfluenzaContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/muestras/u01"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MxU01ListContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/muestras/agregar-muestra-u01"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MxU01Container {...props} />
                  </Header>
                )}
              />
              <Route path="/muestras/editar-muestra-u01/:id"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MxU01Container {...props} />
                  </Header>
                )}
              />
              <Route path="/muestras/transmision"
                exact
                render={props => 
                (
                  <Header {...props}>
                    <MxTransmisionListContainer {...props}/>
                  </Header>
                )}
              />
              <Route path="/muestras/agregar-muestra-transmision"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MxTransmision {...props} />
                  </Header>
                )}
              />
              <Route path="/muestras/editar-muestra-transmision/:id"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MxTransmision {...props} />
                  </Header>
                )}
              />
              <Route path="/muestras/transmision/lavado-nasal"
                exact
                render={props => 
                (
                  <Header {...props}>
                    <MxTransmisionLnListContainer {...props}/>
                  </Header>
                )}
              />
              <Route path="/muestras/agregar-muestra-transmision/lavado-nasal"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MxTransmisionLnContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/muestras/editar-muestra-transmision/lavado-nasal/:id"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MxTransmisionLnContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/muestras/bhc"
                exact
                render={props => 
                (
                  <Header {...props}>
                    <MxBhcListContainer {...props}/>
                  </Header>
                )}
              />
              <Route path="/muestras/agregar-muestra-bhc"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MxBhcContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/muestras/editar-muestra-bhc/:id"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MxBhcContainer {...props} />
                  </Header>
                )}
              />
              <Route path="/recepcion/muestras"
                exact
                render={props => 
                  (
                    <Header {...props}>
                      <RecepcionMxContainer {...props}/>
                    </Header>

                  )}
              />
               <Route path="/muestras/dengue"
                exact
                render={props => 
                  (
                    <Header {...props}>
                      <MxDengueListContainer {...props}/>
                    </Header>

                  )}
              />
              <Route path="/muestras/agregar-muestra-dengue"
                exact
                render={props => 
                  (
                    <Header {...props}>
                      <MxDengueContainer {...props}/>
                    </Header>

                  )}
              />
              <Route path="/muestras/editar-muestra-dengue/:id"
                exact
                render={props =>
                (
                  <Header {...props}>
                    <MxDengueContainer {...props} />
                  </Header>
                )}
              />
            </>
          </Switch>
        </div>
      </Router>
    </>
  );
}
export default App;
