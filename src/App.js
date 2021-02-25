import React, { useEffect, useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
import IdleTimer from "./IdleTimer";
//import { AuthContext } from "./context/Auth";
import Login from './containers/login/LoginContainer';
import Home from './components/home/Home';
import Header from './components/header/Header';

import Categoria from './containers/catalogos/Categoria/CategoriaContainer';
import CambioCategoria from './containers/catalogos/CambioCategoria/CambioCategoriaContainer';
import Clasificacion from './containers/catalogos/Clasificacion/ClasificacionContainer';
import Consultas from './containers/catalogos/Consultas/ConsultasContainer';
import MotivoAnulacion from './containers/catalogos/MotivoAnulacion/MotivoAnulacionContainer';
import CatMuestras from './containers/catalogos/Muestras/MuestrasContainer';
import TipoMuestras from './containers/catalogos/TipoMuestras/TipoMuestrasContainer';
import TipoPruebas from './containers/catalogos/TipoPruebas/TipoPruebasContainer';
import Tubos from './containers/catalogos/Tubos/TubosContainer';

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

function App() {
  const [isTimeout, setIsTimeout] = useState(false);

  let location = useLocation();

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
  }, [location]);

  const LogoutTimeExpired = () => {
    if (isTimeout) {
      localStorage.removeItem('token');
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
    <Router>
      <div className="App">
        {LogoutTimeExpired()}
        <Switch>
          {/* <Route exact path='/' component={Login} /> */}
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={Login}/>
          <>
            <Header />
            <Route path="/home" component={Home} />
            <Route path="/catalogo/categoria" component={Categoria} />
            <Route path="/catalogo/cambio-categoria" component={CambioCategoria} />
            <Route path="/catalogo/clasificacion" component={Clasificacion} />
            <Route path="/catalogo/consultas" component={Consultas} />
            <Route path="/catalogo/motivo-anulacion" component={MotivoAnulacion} />
            <Route path="/catalogo/cat-muestras" component={CatMuestras} />
            <Route path="/catalogo/tipo-muestras" component={TipoMuestras} />
            <Route path="/catalogo/tipo-pruebas" component={TipoPruebas} />
            <Route path="/catalogo/tubos" component={Tubos} />
            <Route path="/seguridad/usuarios" component={Users} />
            <Route path="/seguridad/registrar-usuarios" component={AddUser} />
            <Route path="/seguridad/editar-usuario/:id" component={AddUser} />
            <Route path="/seguridad/cambiar-clave/:id" component={ChangePassword} />
            <Route path="/seguridad/perfiles" component={ProfileListContainer}></Route>
            <Route path="/seguridad/agregar-perfil" component={ProfileContainer}></Route>
            <Route path="/seguridad/editar-perfil/:id" component={ProfileContainer}></Route>
            <Route path="/seguridad/perfil-usuario" component={UserProfileListContainer}></Route>
            <Route path="/seguridad/asignar-perfil-usuario" component={UserProfileContainer}></Route>
            <Route path="/seguridad/editar-perfil-usuario/:id" component={UserProfileContainer}></Route>
            <Route path="/seguridad/menu" component={MenuListContainer}></Route>
            <Route path="/seguridad/agregar-menu" component={MenuContainer}></Route>
            <Route path="/seguridad/editar-menu/:id" component={MenuContainer}></Route>
            <Route path="/seguridad/opciones-menu" component={MenuOptionsListContainer}></Route>
            <Route path="/seguridad/agregar-opcion-menu" component={MenuOptionContainer}></Route>
            <Route path="/seguridad/editar-opcion-menu/:id" component={MenuOptionContainer}></Route>
            <Route path="/seguridad/perfil-opciones-menu" component={ProfileOptionsMenuContainer}></Route>
          </>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
