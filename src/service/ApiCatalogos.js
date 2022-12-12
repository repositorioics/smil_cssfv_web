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

/**Api para el catalogo motivos de anulacion*/
const getMotivosAnulaciones = () => {
    return instance.get("catalogos/motivos-anulaciones");
}

/**----------------------------------- */
/**Api para el catalogo de clasificaciones muestra*/
const postClasificacionMuestra = catClasificacionMuestra => {
    return instance.post("catalogos/clasificaciones/muestras", catClasificacionMuestra);
}

const putClasificacionMuestra = catClasificacionMuestra => {
    return instance.put("catalogos/clasificaciones/muestras", catClasificacionMuestra);
}

const getAllClasificacionesMuestra = () => {
    return instance.get("catalogos/clasificaciones/muestras");
}

const getAllClasificacionesMuestraActivas = () => {
    return instance.get("catalogos/clasificaciones/muestras/activas");
}

const apiCatalogos = { 
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
    postCatAnioEstudio,
    putCatAnioEstudio,
    getAllCatAnioEstudio,
    getLastAnioEstudio,
    getAllCatRecepcion,
    postCatRecepcion,
    getCatRecepcionById,
    putCatRecepcion,
    getCatRecepcionByCodLabScan,
    getAllCategoriasActivas,
    getAllCambiosCategoriasActivas,
    getMotivosAnulaciones,
    postMismoEpFebril,
    putMismoEpFebril,
    getAllEpFebriles,
    postResulMx,
    putResultMx,
    getAllResultMx,
    getAllResultMxByTipoPrueba,
    getAllTiposPruebasByMuestraId,
    getAllTipoPruebasByMuestraIdAndNivel,
    getAllTubosActivos,
    getAllConsultasActivas,
    getAllClasificacionesActivas,
    getAllCatEnvioMuestras,
    postClasificacionMuestra,
    putClasificacionMuestra,
    getAllClasificacionesMuestra,
    getAllClasificacionesMuestraActivas
}

export default apiCatalogos;