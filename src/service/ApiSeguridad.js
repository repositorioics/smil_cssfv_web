import axios from 'axios';

import * as Constants from '../Constants';

const instance = axios.create({
    baseURL: Constants.URL,
    headers: {
        "Accept": "*/*",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    }
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

const login = data => {
    return instance.post("authenticate", data);
    /*return instance.get(`/seguridad/usuarios/login`, null, { params: {
        usuario: data.usuario,
        clave: data.clave
      }})*/
}

/**----------------------------------- */
/**Api para la seguridad usuarios*/
const postUser = usuario => {
    return instance.post("seguridad/usuarios/add", usuario);
}

const getAllUsers = () => {
    return instance.get("seguridad/usuarios");
}

const getUserById = id => {
    return instance.get("seguridad/usuarios/"+id);
}

const putUser = usuario => {
    return instance.put("seguridad/usuarios", usuario);
}

const putUserPassword = usuario => {
    return instance.put("seguridad/usuarios/clave", usuario);
}

/**----------------------------------- */
/**Api para la seguridad perfiles*/
const getAllProfiles = () => {
    return instance.get("seguridad/perfiles");
}

const getProfileById = id => {
    return instance.get("seguridad/perfiles/"+id);
}

const postProfile = perfil => {
    return instance.post("seguridad/perfiles", perfil);
}

const putProfile = perfil => {
    return instance.put("seguridad/perfiles", perfil);
}

const postUserProfile = perfilUsuario => {
    return instance.post("seguridad/perfilesusuario", perfilUsuario);
}

const getAllUserProfile = () => {
    return instance.get("seguridad/perfilesusuario");
}

const getUserProfileById = id => {
    return instance.get("seguridad/perfilesusuario/"+id);
}

const putUserProfile = (perfilUsuario) => {
    return instance.put("seguridad/perfilesusuario", perfilUsuario);
}

const postProfileOptionsMenu = (perfilOpcionMenu) => {
    return instance.post("seguridad/perfilesopcionmenu", perfilOpcionMenu);
}

const getAllProfileOptionsMenuByProfileId = id => {
    return instance.get("seguridad/perfilesopcionmenu/byperfil/"+id);
}

const getAllUserProfileByNombre = (nombre) => {
    return instance.get(`seguridad/perfilesusuario/perfil`, {params : {
        nombre: nombre
    }});
}
/**----------------------------------- */
/**Api para la seguridad menu*/

const getAllMenu = () => {
    return instance.get("seguridad/menus");
}

const postMenu = (menu) => {
    return instance.post("seguridad/menus", menu);
}

const putMenu = (menu) => {
    return instance.put("seguridad/menus", menu);
}

const getMenuById = id => {
    return instance.get("seguridad/menus/"+id);
}

const getAllMenuOption = () => {
    return instance.get("seguridad/opcionesmenu");
}

const getMenuOptionById = id => {
    return instance.get("seguridad/opcionesmenu/"+id);
}

const postMenuOption = (opcionMenu) => {
    return instance.post("seguridad/opcionesmenu", opcionMenu);
}

const putMenuOption = (opcionMenu) => {
    return instance.put("seguridad/opcionesmenu", opcionMenu);
}

const getOpcionesMenuUsuario = (usuario) => {
    return instance.get("/seguridad/opcionesmenuusuario/"+usuario);
}

/**Parametros Sistemas */
const getParametrosSistemaByNombre = nombre => {
    return instance.get("seguridad/parametros/sistema/"+nombre);
}

const apiSeguridad = { 
    login,
    postUser,
    getAllUsers,
    getUserById,
    putUser,
    putUserPassword,
    getAllProfiles,
    getProfileById,
    postProfile,
    putProfile,
    postUserProfile,
    getAllUserProfile,
    getUserProfileById,
    putUserProfile,
    getAllMenu, 
    postMenu,
    putMenu,
    getMenuById,
    getAllMenuOption,
    getMenuOptionById,
    postMenuOption,
    putMenuOption,
    postProfileOptionsMenu,
    getAllProfileOptionsMenuByProfileId,
    getOpcionesMenuUsuario,
    getAllUserProfileByNombre,
    getParametrosSistemaByNombre
}

export default apiSeguridad;