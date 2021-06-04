import axios from 'axios';

const url = 'http://localhost:9191/';
//const url = 'http://192.168.1.3:9191/';

//const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: url,
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

/**Api para el catalogo de categorias */
const postCategoria = catCategoria => {
    return instance.post("catalogos/categorias", catCategoria);
}

const putCategoria = catCategoria => {
    return instance.put("catalogos/categorias", catCategoria);
}


const getAllCategorias = () => {
    return instance.get("catalogos/categorias");
}
/**----------------------------------- */
/**Api para el catalogo de cambio de categorias */
const postCambioCategoria = catCambioCategoria => {
    return instance.post("catalogos/cambio-categorias", catCambioCategoria);
}

const putCambioCategoria = catCambioCategoria => {
    return instance.put("catalogos/cambio-categorias", catCambioCategoria);
}

const getAllCambiosCategorias = () => {
    return instance.get("catalogos/cambio-categorias");
}
/**----------------------------------- */
/**Api para el catalogo de clasificaciones */
const postClasificacion = catClasificacion => {
    return instance.post("catalogos/clasificaciones", catClasificacion);
}

const putClasificacion = catClasificacion => {
    return instance.put("catalogos/clasificaciones", catClasificacion);
}

const getAllClasificaciones = () => {
    return instance.get("catalogos/clasificaciones");
}

const getAllClasificacionesActivas = () => {
    return instance.get("catalogos/clasificaciones/activas");
}
/**----------------------------------- */
/**Api para el catalogo de consultas */
const postConsulta = catConsulta => {
    return instance.post("catalogos/consultas", catConsulta);
}

const putConsulta = catConsulta => {
    return instance.put("catalogos/consultas", catConsulta);
}

const getAllConsultas = () => {
    return instance.get("catalogos/consultas");
}

const getAllConsultasActivas = () => {
    return instance.get("catalogos/consultas/activas");
}
/**----------------------------------- */
/**Api para el catalogo de motivos de anulacion */
const postMotivo = catMotivoAnulacion => {
    return instance.post("catalogos/motivos-anulaciones", catMotivoAnulacion);
}

const putMotivo = catMotivoAnulacion => {
    return instance.put("catalogos/motivos-anulaciones", catMotivoAnulacion);
}

const getAllMotivos = () => {
    return instance.get("catalogos/motivos-anulaciones");
}
/**----------------------------------- */
/**Api para el catalogo de muestras */
const postCatMuestra = catMuestra => {
    return instance.post("catalogos/muestras", catMuestra);
}

const putCatMuestra = catMuestra => {
    return instance.put("catalogos/muestras", catMuestra);
}

const getAllCatMuetra = () => {
    return instance.get("catalogos/muestras");
}
/**----------------------------------- */
/**Api para el catalogo de tipos muestras */
const postTipoMuestras = catTipoMuestra => {
    return instance.post("catalogos/tipos-muestras", catTipoMuestra);
}

const putTipoMuestras = catTipoMuestra => {
    return instance.put("catalogos/tipos-muestras", catTipoMuestra);
}

const getAllTipoMuestras = () => {
    return instance.get("catalogos/tipos-muestras");
}

const getAllTipoMuestrasActivas = () => {
    return instance.get("catalogos/tipos-muestras/activas");
}
/**----------------------------------- */
/**----------------------------------- */
/**Api para el catalogo de tipos pruebas */
const postTipoPruebas = catTipoPrueba => {
    return instance.post("catalogos/tipos-pruebas", catTipoPrueba);
}

const putTipoPruebas = catTipoPrueba => {
    return instance.put("catalogos/tipos-pruebas", catTipoPrueba);
}

const getAllTipoPruebas = () => {
    return instance.get("catalogos/tipos-pruebas");
}

const getAllTiposPruebasByMuestraId = id => {
    return instance.get("catalogos/tipos-pruebas/muestra-id/"+id);
}

const getAllTipoPruebasByMuestraIdAndNivel = (id, nivel) => {
    return instance.get(`catalogos/tipos-pruebas/muestra-id/nivel`, { params: {
        id: id,
        nivel: nivel
    }});
}
/**
 * return instance.get(`muestras/influenza/participantes/codigo/fechas`, { params: {
        codigoParticipante: code,
        strFecha1: startDate,
        strFecha2: endDate
    }})
 */
/**----------------------------------- */
/**Api para el catalogo de tubos */
const postTubo = catTubo => {
    return instance.post("catalogos/tubos", catTubo);
}

const putTubo = catTubo => {
    return instance.put("catalogos/tubos", catTubo);
}

const getAllTubos = () => {
    return instance.get("catalogos/tubos");
}

const getAllTubosActivos = () => {
    return instance.get("catalogos/tubos/activos");
}
/**----------------------------------- */
/**Api para el catalogo de mismo episodio febril */
const postMismoEpFebril = catMismoEpfebril => {
    return instance.post("catalogos/catMismoEpfebril", catMismoEpfebril);
}

const putMismoEpFebril = catMismoEpfebril => {
    return instance.put("catalogos/catMismoEpfebril", catMismoEpfebril);
}

const getAllEpFebriles = () => {
    return instance.get("catalogos/catMismoEpfebril");
}

/**----------------------------------- */
/**Api para el catalogo resultados muestras */
const postResulMx = catResultadosMuestras => {
    return instance.post("catalogos/catResultadosMuestras", catResultadosMuestras);
}

const putResultMx = catResultadosMuestras => {
     return instance.put("catalogos/catResultadosMuestras", catResultadosMuestras);
}

const getAllResultMx = () => {
    return instance.get("catalogos/catResultadosMuestras");
}

const getAllResultMxByTipoPrueba = id => {
    return instance.get(`catalogos/catResultadosMuestras/ByIdTipoPrueba`, {params : {
        id: id
    }});
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
/**----------------------------------- */

const getParticipanteByCode = codigo => {
    return instance.get("participantes/"+codigo);
}

/**----------------------------------- */
/**Api para las muestras*/
const getCountMuestrasByCodigoParticipanteYCatMuestraId = (codigoParticipante, id) => {
    return instance.get(`muestras/byCodigoParticipante_Y_catMuestraId`, { params: {
        codigoParticipante: codigoParticipante,
        id: id
    }})
}

const postMuestraInfluenza = (muestra) => {
    return instance.post("muestras/influenza", muestra);
}

const putMuestraInfluenza = (muestra) => {
    return instance.put("muestras/influenza", muestra);
}

const getMuestrasInfluenza = () => {
    return instance.get("muestras/influenza/fechaDelDia");
}

const filtroMxInfluenza = (code, startDate, endDate) => {
    return instance.get(`muestras/influenza/participantes/codigo/fechas`, { params: {
        codigoParticipante: code,
        strFecha1: startDate,
        strFecha2: endDate
    }})
}

const getMuestraInfluenzaById = id => {
    return instance.get("muestras/influenza/"+id);
}

/* const getMuestraInfluenzaUltimoRegistro = (code) => {
    return instance.get(`muestras/influenza/ultimoRegistro`, { params: {
        codigoParticipante: code
    }});
} */

const getUltimoRegistroMuestraInfluenza = (code) => {
    return instance.get(`muestras/influenza/ultimoRegistro`, { params: {
        codigoParticipante: code
    }});
}
/**Metodo para anular las muestras (Influenza, Dengue, BHC, etc) */
const anularMuestra = (muestra) => {
    return instance.put("muestras/anular", muestra);
}

/**----------------------------------- */
/**Api para el catalogo motivos de anulacion*/
const getMotivosAnulaciones = () => {
    return instance.get("catalogos/motivos-anulaciones");
}

const api = {
    login,
    postCategoria,
    getAllCategorias,
    putCategoria,
    postCambioCategoria,
    putCambioCategoria,
    getAllCambiosCategorias,
    postClasificacion,
    putClasificacion,
    getAllClasificaciones,
    postConsulta,
    putConsulta,
    getAllConsultas,
    postMotivo,
    putMotivo,
    getAllMotivos,
    postCatMuestra,
    putCatMuestra,
    getAllCatMuetra,
    postTipoMuestras,
    putTipoMuestras,
    getAllTipoMuestras,
    getAllTipoMuestrasActivas,
    postTipoPruebas,
    putTipoPruebas,
    getAllTipoPruebas,
    postTubo,
    putTubo,
    getAllTubos,
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
    getParticipanteByCode,
    getAllUserProfileByNombre,
    getCountMuestrasByCodigoParticipanteYCatMuestraId,
    postMuestraInfluenza,
    putMuestraInfluenza,
    getMuestrasInfluenza,
    getMotivosAnulaciones,
    anularMuestra,
    filtroMxInfluenza,
    getMuestraInfluenzaById,
    postMismoEpFebril,
    putMismoEpFebril,
    getAllEpFebriles,
    postResulMx,
    putResultMx,
    getAllResultMx,
    getAllResultMxByTipoPrueba,
    getAllTiposPruebasByMuestraId,
    getUltimoRegistroMuestraInfluenza,
    getAllTipoPruebasByMuestraIdAndNivel,
    getAllTubosActivos,
    getAllConsultasActivas,
    getAllClasificacionesActivas,
    getOpcionesMenuUsuario
};

export default api;