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

const getAllCategoriasActivas = () => {
    return instance.get("/catalogos/categorias/activas");
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

const getAllCambiosCategoriasActivas = () => {
    return instance.get("/catalogos/cambio-categorias/activas");
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

const getAllCatMuestasActivas = () => {
    return instance.get("catalogos/muestras/activas");
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
/**Api para el catalogo de visitas */
const getAllVisitas = () => {
    return instance.get("catalogos/catVisitas"); ///catalogos/catVisitas
}

const getAllVisitasActivas = () => {
    return instance.get("catalogos/catVisitas/activas");
}

const postVisita = catVisitas => {
    return instance.post("catalogos/catVisitas", catVisitas);
}

const putVisita = catVisitas => {
    return instance.put("catalogos/catVisitas", catVisitas);
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

/**Api para el catalogo de recepcion */
const getAllCatRecepcion = () => {
    return instance.get("catalogos/recepcion");
}

const postCatRecepcion = catRecepcion => {
    return instance.post("catalogos/recepcion", catRecepcion);
}

const getCatRecepcionById = id => {
    return instance.get("catalogos/recepcion/"+id)
}

const putCatRecepcion = catRecepcion => {
    return instance.put("catalogos/recepcion/", catRecepcion);
}

const getCatRecepcionByCodLabScan = codLab => {
    return instance.get(`catalogos/recepcion/codLab/`, {params : {
        codLab: codLab
    }});
}

/**Api para el catalogo año estudio */
const postCatAnioEstudio = catAnioEstudio => {
    return instance.post("catalogos/catAnioEstudio", catAnioEstudio);
}

const putCatAnioEstudio = catAnioEstudio => {
    return instance.put("catalogos/catAnioEstudio", catAnioEstudio);
}

const getAllCatAnioEstudio = () => {
    return instance.get("catalogos/catAnioEstudio");
}

const getLastAnioEstudio = () => {
    return instance.get("catalogos/catAnioEstudio/ultimo-anio-estudio");
}

/**Api para el catalogo envio muestras */
const getAllCatEnvioMuestras = () => {
    return instance.get("catalogos/envio-muestras/activas");
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

const getEstudios = () => {
    return instance.get("estudios")
}

const getEstudiosByCodigo = codigo => {
    return instance.get("estudios/"+codigo);
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

const codigoLabUltimaMxInfluenzaPorCodigo = (codigo) => {
    return instance.get(`muestras/influenza/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
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

const muestraInfluenzaByCodLabScan = (codLabScan) => {
    return instance.get(`muestras/influenza/cod_lab_scan`, { params: {
        codLabScan: codLabScan
    }});
}

/**Muestras BHC */
const getMuestrasBhc = () => {
    return instance.get("muestras/bhc/fechaDelDia");
}

const filtroMxBhc = (code, startDate, endDate) => {
    return instance.get(`muestras/bhc/participantes/codigo/fechas`, { params: {
        codigoParticipante: code,
        strFecha1: startDate,
        strFecha2: endDate
    }})
}

const postMuestraBhc = (muestra) => {
    return instance.post('muestras/bhc', muestra);
}

const putMuestraBhc = (muestra) => {
    return instance.put('muestras/bhc', muestra);
}

const muestrasBhcById = (id) => {
    return instance.get("muestras/bhc/"+id);
}

const codigoLabUltimaMxBHCPorCodigo = (codigo) => {
    return instance.get(`muestras/bhc/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

const muestraBHCByCodLabScan = (codLabScan) => {
    return instance.get(`muestras/bhc/cod_lab_scan`, { params: {
        codLabScan: codLabScan
    }});
}

/**Muestras U01 */
const getMuestrasU01 = () => {
    return instance.get("muestras/u01/fechaDelDia");
}

const getMustraU01ById = id => {
    return instance.get("muestras/u01/"+id);
}

const filtroMxU01 = (code, startDate, endDate) => {
    return instance.get(`muestras/u01/participantes/codigo/fechas`, { params: {
        codigoParticipante: code,
        strFecha1: startDate,
        strFecha2: endDate
    }})
}

const postMuestraU01 = (muestra) => {
    return instance.post("muestras/u01", muestra);
}

const putMuestraU01 = (muestra) => {
    return instance.put("muestras/u01", muestra);
}

const codigoLabUltimaMxUO1IngresadaPorCodigo = (codigo) => {
    return instance.get(`muestras/u01/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}


const muestraUO1ByCodLabScan = (codLabScan) => {
    return instance.get(`muestras/u01/cod_lab_scan`, { params: {
        codLabScan: codLabScan
    }});
}

/**Muestras Transmisión */
const getMuestrasTransmision = (idMx) => {
    return instance.get("muestras/transmision/fechaDelDia", {params: {
        idMx: idMx
    }});
}

/*const getMuestrasTransmision = (id) => {
    return instance.get("muestras/transmision", {params: {
        id: id
    }});
}*/

const getMuestrasTransmisionById = id => {
    return instance.get("muestras/transmision/"+id);
}

const filtroMxTransmision = (code, startDate, endDate, idMx) => {
    return instance.get(`muestras/transmision/participantes/codigo/fechas`, { params: {
        codigoParticipante: code,
        idMx: idMx,
        strFecha1: startDate,
        strFecha2: endDate
    }});
}

const postMuestraTransmision = (muestra) => {
    return instance.post("muestras/transmision", muestra);
}

const putMuestraTransmision = (muestra) => {
    return instance.put("muestras/transmision", muestra);
}

const codigoLabUltimaMxTransmisionPorCodigo = (codigo) => {
    return instance.get(`muestras/transmision/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

const muestraTransmisionByCodLabScan = (codLabScan) => {
    return instance.get(`muestras/transmision/cod_lab_scan`, { params: {
        codLabScan: codLabScan
    }});
}

/**Metodo para anular las muestras (Influenza, Dengue, BHC, etc) */
const anularMuestra = (muestra) => {
    return instance.put("muestras/anular", muestra);
}

/**Metodo para enviar las muestras (Influenza, Dengue, BHC, etc)*/
const enviarMuestras = (muestra) => {
    return instance.put("muestras/envio", muestra);
}

/**Metodo obtener todas las muestras tomadas (Influenza, Dengue, BHC, etc)*/
const getAllMuestrasTomadas = () => {
    return instance.get("muestras/cantidadMuestrasTomadas");
}

const getLastMuestrasTomadas = () => {
    return instance.get("muestras/ultimos-registros");
}

const mxByCodLabScan = (codLabScan) => {
    return instance.get(`muestras/codLabScan`, {
        params: {
            codLabScan: codLabScan
        }
    });
}

const mxByCodLab = (codLab) => {
    return instance.get(`muestras/codLab`, {
        params: {
            codLab: codLab
        }
    });
}

/**----------------------------------- */
/**Muestras Dengue */
const getMuestrasDengue = () => {
    return instance.get("muestras/dengue/fechaDelDia");
}

const filtroMxDengue = (code, startDate, endDate, mxType) => {
    return instance.get(`muestras/dengue/participantes/codigo/fechas`, { params: {
        codigoParticipante: code,
        strFecha1: startDate,
        strFecha2: endDate,
        mxType: mxType
    }})
}

const getAllMxDengueRangoFecha = (startDate, endDate) => {
    return instance.get(`muestras/dengue/rango-fecha`, { params: {
        strFecha1: startDate,
        strFecha2: endDate
    }})
}

const postMuestraDengue = (muestra) => {
    return instance.post("muestras/dengue", muestra);
}

const putMuestraDengue = (muestra) => {
    return instance.put("muestras/dengue", muestra);
}

const getMuestraDengueById = id => {
    return instance.get("muestras/dengue/"+id);
}

/**Muestras pendientes de envio */
const muestrasPendientesDengue = (id) => {
    return instance.get(`muestras/dengue/pendientes/envio`, {
        params: {
            id: id
        }
    });
}

const muestrasPendientesTransmision = (id) => {
    return instance.get(`muestras/transmision/pendientes/envio`, {
        params: {
            id: id
        }
    });
}

const muestrasPendientesBHC = (id) => {
    return instance.get(`muestras/bhc/pendientes/envio`, {
        params: {
            id: id
        }
    });
}

const muestrasPendientesUO1 = (id) => {
    return instance.get(`muestras/u01/pendientes/envio`, {
        params: {
            id: id
        }
    });
}

const muestrasEnviadasTransmision = (id, viaje, startDate, endDate) => {
    return instance.get(`muestras/transmision/enviadas`, {
        params: {
            id: id,
            viaje: viaje,
            startDate: startDate,
            endDate: endDate
        }
    });
}

const muestrasEnviadasBHC = (id, viaje, startDate, endDate) => {
    return instance.get(`muestras/bhc/enviadas`, {
        params: {
            id: id,
            viaje: viaje,
            startDate: startDate,
            endDate: endDate
        }
    });
}

const muestrasEnviadasUO1 = (id, viaje, startDate, endDate) => {
    return instance.get(`muestras/u01/enviadas`, {
        params: {
            id: id,
            viaje: viaje,
            startDate: startDate,
            endDate: endDate
        }
    });
}
/*const muestrasVacunasPendientesUO1 = (id) => {
    return instance.get(`muestras/u01/vacunas/pendientes/envio`);
}*/

/*const muestrasPendientesTransmisionMonitoreoIntensivoPbmc = () => {
    return instance.get(`muestras/transmision/monitoreo/intensivo/pbmc/pendientes/envio`);
}
const muestrasPendientesTransmisionMonitoreoIntensivoRojo = () => {
    return instance.get(`muestras/transmision/monitoreo/intensivo/rojo/pendientes/envio`);
}
const muestrasPendientesTransmisionCovidPbmc = () => {
    return instance.get(`muestras/transmision/covid/pbmc/pendientes/envio`);
}
const muestrasPendientesTransmisionCovidRojo = () => {
    return instance.get(`muestras/transmision/covid/rojo/pendientes/envio`);
}
const muestrasPendientesTransmisionHisopadosCovid = () => {
    return instance.get(`muestras/transmision/hisopados/covid/pendientes/envio`);
}
const muestrasPendientesTransmisionHisopadosMonitoreIntensivo = () => {
    return instance.get(`muestras/transmision/hisopado/monitoreo/intensivo/pendientes/envio`);
}*/

const muestrasPendientesInfluenza = (id) => {
    return instance.get(`/muestras/influenza/pendientes/envio`, { params: {
        id: id
    }});
}

/** */
const verificarEnvioSeleccionado = (viaje) => {
    return instance.get(`muestras/existe/envio-seleccionado`, {
        params: {
            viaje: viaje
        }
    });
}

const muestrasDengueMetabolomicas = () => {
    return instance.get("muestras/dengue/metabolomicas");
}

const muestrasDengueBhc = () => {
    return instance.get("muestras/dengue/bhc");
}

const muestrasDenguePbmc = () => {
    return instance.get("muestras/dengue/pbmc");
}

const muestrasDenguePaxGene = () => {
    return instance.get("muestras/dengue/paxgene");
}

const muestrasDengueHematicas = () => {
    return instance.get("muestras/dengue/hematicas");
}

const codigoLabUltimaMxDengueMetabolomicaPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/metabolomica/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

const codigoLabUltimaMxDengueBhcPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/bhc/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

const codigoLabUltimaMxDenguePbmcPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/pbmc/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

const codigoLabUltimaMxDenguePaxGenePorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/paxgene/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

const codigoLabUltimaMxDengueHematicaPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/hematica/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

const mxDengueMetabolomicaPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/metabolomica/ultima/muestra/codigoParticipante`, { params: {
        codigo: codigo
    }});
}

const mxDengueBhcPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/bhc/ultima/muestra/codigoParticipante`, { params: {
        codigo: codigo
    }});
}

const mxDenguePbmcPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/pbmc/ultima/muestra/codigoParticipante`, { params: {
        codigo: codigo
    }});
}

const mxDenguePaxGenePorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/paxgene/ultima/muestra/codigoParticipante`, { params: {
        codigo: codigo
    }});
}

const mxDengueHematicaPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/hematica/ultima/muestra/codigoParticipante`, { params: {
        codigo: codigo
    }});
}

const muestraDengueByCodLabScan = (codLabScan) => {
    return instance.get(`muestras/dengue/cod_lab_scan`, { params: {
        codLabScan: codLabScan
    }});
}

const muestraDengueCandidatosPbmc = () => {
    return instance.get("muestras/dengue/candidatos/pbmc");
}

/**Dengue Detalle */
const postMuestraDengueDetalle = (id, dengueDetalle) => {
    return instance.post("muestras/dengue/detalle/"+id, dengueDetalle);
}

/**----------------------------------- */
/**Api para el catalogo motivos de anulacion*/
const getMotivosAnulaciones = () => {
    return instance.get("catalogos/motivos-anulaciones");
}

const getMuestrasPorEstudios = () => {
    return instance.get("muestras/por_estudios");
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
    getAllCatMuestasActivas,
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
    getAllVisitas,
    getAllVisitasActivas,
    postVisita,
    putVisita,
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
    getOpcionesMenuUsuario,
    getMuestrasU01,
    filtroMxU01,
    postMuestraU01,
    putMuestraU01,
    getMustraU01ById,
    getMuestrasTransmision,
    getMuestrasTransmisionById,
    filtroMxTransmision,
    postMuestraTransmision,
    putMuestraTransmision,
    getMuestrasBhc,
    filtroMxBhc,
    postMuestraBhc,
    putMuestraBhc,
    muestrasBhcById,
    getAllCategoriasActivas,
    getAllCambiosCategoriasActivas,
    getMuestrasDengue,
    filtroMxDengue,
    getAllMxDengueRangoFecha,
    postMuestraDengue,
    putMuestraDengue,
    getMuestraDengueById,
    /** */
    muestrasPendientesTransmision,
    muestrasPendientesInfluenza,
    muestrasPendientesBHC,
    muestrasPendientesUO1,
    //muestrasVacunasPendientesUO1,
    muestrasPendientesDengue,
    /*muestrasPendientesTransmisionMonitoreoIntensivoPbmc,
    muestrasPendientesTransmisionMonitoreoIntensivoRojo,
    muestrasPendientesTransmisionCovidPbmc,
    muestrasPendientesTransmisionCovidRojo,
    muestrasPendientesTransmisionHisopadosCovid,
    muestrasPendientesTransmisionHisopadosMonitoreIntensivo,*/

    muestrasEnviadasTransmision,
    muestrasEnviadasUO1,
    muestrasEnviadasBHC,
    /** */
    muestrasDengueMetabolomicas,
    muestrasDengueBhc,
    muestrasDenguePbmc,
    muestrasDenguePaxGene,
    muestrasDengueHematicas,
    enviarMuestras,
    getAllMuestrasTomadas,
    getLastMuestrasTomadas,
    getAllCatRecepcion,
    postCatRecepcion,
    getCatRecepcionById,
    putCatRecepcion,
    getCatRecepcionByCodLabScan,
    getEstudios,
    getEstudiosByCodigo,
    getMuestrasPorEstudios,
    codigoLabUltimaMxUO1IngresadaPorCodigo,
    codigoLabUltimaMxTransmisionPorCodigo,
    codigoLabUltimaMxBHCPorCodigo,
    codigoLabUltimaMxInfluenzaPorCodigo,
    codigoLabUltimaMxDengueMetabolomicaPorCodigo,
    codigoLabUltimaMxDengueBhcPorCodigo,
    codigoLabUltimaMxDenguePbmcPorCodigo,
    codigoLabUltimaMxDenguePaxGenePorCodigo,
    codigoLabUltimaMxDengueHematicaPorCodigo,
    mxDengueMetabolomicaPorCodigo,
    mxDengueBhcPorCodigo,
    mxDengueHematicaPorCodigo,
    mxDenguePaxGenePorCodigo,
    mxDenguePbmcPorCodigo,
    postCatAnioEstudio,
    putCatAnioEstudio,
    getAllCatAnioEstudio,
    getLastAnioEstudio,
    muestraBHCByCodLabScan,
    muestraInfluenzaByCodLabScan,
    muestraUO1ByCodLabScan,
    muestraTransmisionByCodLabScan,
    muestraDengueByCodLabScan,
    mxByCodLabScan,
    mxByCodLab,
    muestraDengueCandidatosPbmc,
    postMuestraDengueDetalle,
    getAllCatEnvioMuestras,
    verificarEnvioSeleccionado
};

export default api;